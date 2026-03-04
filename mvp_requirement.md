# YouTube Cinema Focus — MVP Requirements

**Version:** 1.0.0  
**Target:** Chromium-based browsers (MV3)  
**Scope:** Theater Mode only

---

## Goal

A lightweight browser extension that automatically activates a cinema-style **Focus Mode** whenever the user enters YouTube's Theater Mode. No popups, no manual toggles — it just works.

When active, the page goes dark and everything disappears except the video player and its controls.

---

## Target Platform

- Chromium-based browsers (Chrome, Vivaldi, Edge, Brave)
- Manifest Version 3
- No backend required

---

## Functional Requirements

### Auto-Activation
- Detect when the user switches to **Theater Mode**
- Enable Focus Mode automatically on activation
- Disable Focus Mode automatically when leaving Theater Mode
- Handle YouTube's SPA navigation (no full page reloads between videos)

### Focus Mode Behavior
When active, the following must be true:

| Element | Behavior |
|---|---|
| Page background | Black |
| Header / masthead | Hidden |
| Sidebar / suggested videos | Hidden |
| Comments section | Hidden |
| Video description & metadata | Hidden |
| End-screen recommendations | Hidden |
| Video player | Fully visible |
| Playback controls | Fully visible and usable |

---

## Non-Functional Requirements

- No popup or manual toggle UI
- No backend or external requests
- Minimal DOM footprint and performance overhead
- Clean, readable, maintainable code
- Must survive YouTube SPA navigation between videos

---

## Out of Scope (Future Versions)

- Manual toggle button or popup UI
- Timer / Pomodoro mode
- Full-screen behavior changes
- Analytics or usage statistics
- Per-channel whitelist
- Firefox / Safari support