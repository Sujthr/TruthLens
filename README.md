# TruthLens AI

A Chrome extension that detects bias and misinformation in online articles using Google's Gemini AI.

## Features

- **Bias Detection** — Identifies left, right, or neutral bias with explanations
- **Emotional Language** — Highlights emotionally charged language in articles
- **Missing Context** — Surfaces facts or context the article may have omitted
- **Opposing Viewpoints** — Presents alternative perspectives
- **Trust Score** — Rates article credibility on a 0–100 scale

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Sujthr/TruthLens.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked** and select the `TruthLens` folder

## Setup

1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Click the TruthLens extension icon in your browser toolbar
3. Enter your API key in the input field and click **Save**

> Your API key is stored locally in your browser's extension storage. It is never hardcoded or shared.

## Usage

1. Navigate to any news article or blog post
2. Click the TruthLens extension icon
3. Click **Analyze Article**
4. View the AI-generated bias analysis in the popup

## Tech Stack

- **Chrome Extension** (Manifest V3)
- **Google Gemini 2.5 Flash-Lite** for AI analysis
- **Chrome Storage API** for secure local key storage

## Project Structure

```
TruthLens/
├── manifest.json    # Extension configuration
├── background.js    # Service worker — handles Gemini API calls
├── content.js       # Content script — extracts article text
├── popup.html       # Extension popup UI
├── popup.js         # Popup logic — key management & analysis trigger
├── styles.css       # Popup styling
└── README.md
```

## License

MIT
