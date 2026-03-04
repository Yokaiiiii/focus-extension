## YouTube Cinema Focus – MVP Requirements (Theater Mode Only)

### 1. Project Goal
Build a browser extension that automatically enables a cinema-style Focus Mode **only when the user switches to YouTube’s Theater Mode**.  
When activated, the page should appear black except for the video player and playback controls.

---

### 2. Target Platform
- Chromium-based browsers (tested on Vivaldi)
- Manifest Version 3

---

### 3. Functional Requirements

#### 3.1 Automatic Activation
- Detect when user switches to **Theater Mode**.
- Enable Focus Mode automatically.
- Disable Focus Mode when leaving Theater Mode (back to default mode).

#### 3.2 Focus Mode Behavior (Theater Mode)
- Entire page background black.
- All UI elements hidden (sidebar, header, comments, suggested videos, etc.).
- Video player and playback controls fully visible and usable.
- End-screen recommendations hidden.

---

### 4. Non-Functional Requirements
- No popup or manual toggle required.
- No backend.
- Minimal performance overhead.
- Must handle YouTube SPA navigation (clicking between videos without page reload).
- Clean and maintainable code.

---

### 5. Out of Scope (Future Versions)
- Manual toggle button.
- Timer / Pomodoro mode.
- Full-screen behavior changes.
- Analytics tracking or statistics.
- Whitelist of channels.