<div align="center">

# 🎬 YouTube Cinema Focus

**Automatic cinema-style focus mode for YouTube Theater Mode.**  
No buttons. No settings. It just works.

![Version](https://img.shields.io/badge/version-1.0.0-black?style=flat-square)
![Manifest](https://img.shields.io/badge/manifest-v3-red?style=flat-square&logo=googlechrome)
![License](https://img.shields.io/badge/license-MIT-white?style=flat-square)

</div>

---

## What it does

The moment you switch to **Theater Mode** on YouTube, the extension kicks in — the page goes black, every distraction disappears, and only the video remains.

Switch back out of Theater Mode and everything returns to normal. Zero configuration required.

```
Before  →  Header, sidebar, comments, suggestions, descriptions...
After   →  ░░░░░░░░░░░░░  [ VIDEO ]  ░░░░░░░░░░░░░
```

---

## Features

- ⚡ **Instant** — activates the moment Theater Mode is toggled
- 🧹 **Clean** — hides header, sidebar, comments, end-screens, and all metadata
- 🔁 **SPA-aware** — survives YouTube navigation without page reloads
- 🪶 **Lightweight** — no background scripts, no permissions, no backend
- 🔕 **Silent** — no popups, no badges, no onboarding

---

## Installation

> This extension is unpacked (developer mode). It takes about 30 seconds to install.

### Step 1 — Download the extension

Save the extension folder to somewhere permanent on your computer.  
**Do not move or delete this folder** — Chrome references it directly.

```
youtube-cinema-focus/
├── manifest.json
└── content.js
```

### Step 2 — Open Chrome Extensions

Open your browser and go to:

```
chrome://extensions
```

Or navigate via: **Menu → More Tools → Extensions**

### Step 3 — Enable Developer Mode

In the top-right corner of the Extensions page, toggle **Developer mode** on.

```
┌─────────────────────────────────────────┐
│  Extensions              Developer mode ●│
└─────────────────────────────────────────┘
```

### Step 4 — Load the extension

Click **"Load unpacked"** (top-left) and select the `youtube-cinema-focus` folder.

```
[ Load unpacked ]  [ Pack extension ]  [ Update ]
       ↑
   click here
```

The extension will appear in your list and is immediately active.

---

## Usage

1. Go to [youtube.com](https://youtube.com) and open any video
2. Click the **Theater Mode** button in the player controls (or press `t`)
3. Focus Mode activates automatically — enjoy the video
4. Press `t` again or click the button to exit and restore the full page

```
┌─────────────────────────────────────────┐
│          ░░░░░░░░░░░░░░░░░░░░░          │
│          ░                 ░░           │
│          ░    ▶  VIDEO     ░░           │
│          ░                 ░░           │
│          ░░░░░░░░░░░░░░░░░░░░           │
│  ▶  ──────────────────  🔊  ⛶          │
└─────────────────────────────────────────┘
```

---

## Updating the extension

If you edit `content.js` or `manifest.json`:

1. Go back to `chrome://extensions`
2. Find **YouTube Cinema Focus**
3. Click the **refresh icon** ↺ on the extension card

Changes take effect immediately on the next page load.

---

## Uninstalling

1. Go to `chrome://extensions`
2. Find **YouTube Cinema Focus**
3. Click **Remove**

You can also safely delete the folder from your computer after removing it.

---

## Technical notes

- Built with **Manifest V3** — no deprecated APIs
- Uses a `MutationObserver` on `ytd-watch-flexy[theater]` for zero-polling detection
- Listens to `yt-navigate-finish` for SPA navigation handling
- Injects a single `<style>` tag — no external resources, no network requests
- Requires no permissions beyond the default content script access to `youtube.com`

---

<div align="center">

Made for distraction-free watching. Nothing more.

</div>