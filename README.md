<div align="center">

# 🎬 YouTube Cinema Focus

**Cinema-style focus mode for YouTube Theater Mode.**  
Enable it when you need to focus. Forget it exists when you don't.

![Version](https://img.shields.io/badge/version-1.1.0-black?style=flat-square)
![Manifest](https://img.shields.io/badge/manifest-v3-red?style=flat-square&logo=googlechrome)
![License](https://img.shields.io/badge/license-MIT-white?style=flat-square)

</div>

---

## What it does

Toggle the extension on via the popup, switch YouTube to **Theater Mode**, and every distraction vanishes — header, sidebar, comments, suggestions, end-screens, all of it. Only the video remains.

Toggle it off when you're just browsing and YouTube works completely normally.

```
Focus ON  + Theater Mode  →  ░░░░░░  [ VIDEO ]  ░░░░░░
Focus OFF + Theater Mode  →  YouTube works as usual
```

---

## Features

- 🔘 **Popup toggle** — enable only when you need to focus, disable for casual browsing
- ⚡ **Instant** — activates the moment Theater Mode is toggled
- 🧹 **Clean** — hides header, sidebar, comments, end-screens, and all metadata
- 🔁 **SPA-aware** — survives YouTube navigation without page reloads
- 💾 **Persistent** — remembers your on/off preference across browser restarts
- 🪶 **Lightweight** — no background scripts, no external requests

---

## File structure

```
youtube-cinema-focus/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Installation

> This is an unpacked extension (developer mode). Takes about 30 seconds.

### Step 1 — Keep the folder somewhere permanent

Place the `youtube-cinema-focus` folder in a location you won't move or delete it from — Chrome references it directly.

### Step 2 — Open Chrome Extensions

```
chrome://extensions
```

Or: **Menu → More Tools → Extensions**

### Step 3 — Enable Developer Mode

Toggle **Developer mode** on in the top-right corner of the Extensions page.

```
┌─────────────────────────────────────────┐
│  Extensions              Developer mode ●│
└─────────────────────────────────────────┘
```

### Step 4 — Load the extension

Click **"Load unpacked"** and select the `youtube-cinema-focus` folder.

```
[ Load unpacked ]  [ Pack extension ]  [ Update ]
       ↑
   click here
```

The extension appears in your toolbar and is ready to use.

---

## Usage

1. Click the **🎬 Cinema Focus** icon in your Chrome toolbar
2. Toggle **Focus Mode** to **Enabled**
3. Go to YouTube, open a video, and press `t` (or click the Theater Mode button)
4. Focus Mode activates — distractions gone
5. Press `t` again to exit Theater Mode and restore the full page
6. To use YouTube normally, just toggle the extension **Off** from the popup

```
Popup → [ Focus Mode  ●─────── ]  ← Enabled (red)
Popup → [ Focus Mode ─────────○]  ← Disabled (grey)
```

---

## Updating after edits

If you modify any file in the extension folder:

1. Go to `chrome://extensions`
2. Find **YouTube Cinema Focus**
3. Click the **refresh icon** ↺ on the extension card

---

## Uninstalling

1. Go to `chrome://extensions`
2. Find **YouTube Cinema Focus** → click **Remove**
3. Optionally delete the folder from your computer

---

## Technical notes

- **Manifest V3** — no deprecated APIs
- `MutationObserver` on `ytd-watch-flexy[theater]` for zero-polling theater mode detection
- `yt-navigate-finish` event for clean SPA navigation handling
- `chrome.storage.local` to persist the enabled/disabled state
- `chrome.runtime.onMessage` for instant popup → content script communication
- Single injected `<style>` tag — no network requests, no external resources
- Permissions used: `storage` only

---

<div align="center">

Made for distraction-free watching. Nothing more.

</div>