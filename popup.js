const apiKeyInput = document.getElementById("apiKeyInput");
const saveKeyBtn = document.getElementById("saveKey");
const keyStatus = document.getElementById("keyStatus");
const analyzeBtn = document.getElementById("analyze");
const output = document.getElementById("output");

// Load saved API key status on popup open
chrome.storage.local.get("geminiApiKey", ({ geminiApiKey }) => {
  if (geminiApiKey) {
    keyStatus.textContent = "Key saved.";
    keyStatus.style.color = "green";
    apiKeyInput.placeholder = "Key is set (enter new to replace)";
  }
});

// Save API key
saveKeyBtn.onclick = () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    keyStatus.textContent = "Please enter a valid key.";
    keyStatus.style.color = "red";
    return;
  }
  chrome.storage.local.set({ geminiApiKey: key }, () => {
    keyStatus.textContent = "Key saved.";
    keyStatus.style.color = "green";
    apiKeyInput.value = "";
    apiKeyInput.placeholder = "Key is set (enter new to replace)";
  });
};

// Analyze article
analyzeBtn.onclick = async () => {
  output.innerText = "Analyzing bias...";

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let response;
    try {
      response = await chrome.tabs.sendMessage(tab.id, { action: "getContent" });
    } catch {
      output.innerText = "Could not read page content. Try refreshing the page.";
      return;
    }

    if (!response || !response.text) {
      output.innerText = "No article content found on this page.";
      return;
    }

    const result = await chrome.runtime.sendMessage({
      action: "analyze",
      text: response.text
    });

    if (result.error) {
      output.innerText = "Error: " + result.error;
    } else {
      output.innerText = result.result;
    }
  } catch (err) {
    output.innerText = "Error: " + err.message;
  }
};
