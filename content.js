function getArticleText() {
  // Try common article tags first
  let article = document.querySelector("article");

  if (article) return article.innerText;

  // fallback
  return document.body.innerText.slice(0, 15000);
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "getContent") {
    sendResponse({ text: getArticleText() });
  }
});