async function analyzeTruth(text, apiKey) {
  const prompt = `
Analyze the following article and return:

1. Bias (Left / Right / Neutral) with explanation
2. Emotional Language (examples)
3. Missing Context or facts
4. Opposing viewpoints
5. Trust Score (0-100)

Article:
${text}
`;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" + apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error (${response.status}): ${err}`);
  }

  const data = await response.json();

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "analyze") {
    chrome.storage.local.get("geminiApiKey", ({ geminiApiKey }) => {
      if (!geminiApiKey) {
        sendResponse({ error: "API key not set. Please enter your Gemini API key in the extension popup." });
        return;
      }
      analyzeTruth(req.text, geminiApiKey)
        .then(result => sendResponse({ result }))
        .catch(err => sendResponse({ error: err.message }));
    });

    return true; // keep message channel open for async response
  }
});
