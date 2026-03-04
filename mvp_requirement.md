## YouTube Focus Mode – MVP Requirements

### 1. Project Goal

Build a browser extension that enables a manual “Focus Mode” on YouTube.

When activated, the page should simulate a cinema-style blackout where only the video content remains visible and all other UI elements are hidden or blacked out.

---

### 2. Target Platform

* Chromium-based browsers
* Tested on Vivaldi
* Manifest Version 3

---

### 3. Functional Requirements

#### 3.1 Toggle Control

* Extension must provide a manual ON/OFF toggle.
* Toggle state must persist across page reloads.
* Toggle state must persist across browser sessions.

---

#### 3.2 Focus Mode Behavior (When ON)

Across all pages on youtube.com:

* Entire page background must appear black.
* All UI elements must be hidden or visually removed.
* Only the video player element must remain visible.
* Playback controls must remain functional.
* End-screen recommendations must not be visible.

---

#### 3.3 When OFF

* YouTube must behave normally.
* No styling or DOM changes should persist.

---

### 4. Non-Functional Requirements

* No backend.
* No external libraries.
* Minimal performance overhead.
* Must handle YouTube SPA navigation.
* Clean, minimal code structure.

---

### 5. Out of Scope (Future Versions)

* Timer / Pomodoro mode
* Channel whitelist
* Scheduled activation
* Analytics tracking
* Productivity statistics

---

# 📌 One More Suggestion

Add a section:

### 6. Version

MVP Version: 0.1
Date: 4th March 

---
