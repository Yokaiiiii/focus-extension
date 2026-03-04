/**********************************************************************
 * YouTube Cinema Focus - content.js
 *
 * This file runs directly inside youtube.com pages.
 * It controls turning Focus Mode ON and OFF.
 *
 * How it works:
 * - When Focus Mode is enabled → we inject a <style> tag.
 * - That style hides everything on the page.
 * - Then we re-enable visibility only for the <video> element.
 * - When disabled → we remove that <style> tag.
 **********************************************************************/

// This variable stores whether focus mode is currently enabled
let focusEnabled = false;


/**********************************************************************
 * FUNCTION: enableFocusMode()
 *
 * This function injects CSS into the page to hide everything
 * except the actual <video> element.
 **********************************************************************/
function enableFocusMode() {

    // Safety check:
    // If we already injected the style before,
    // don't inject it again (prevents duplicates).
    if (document.getElementById("yt-focus-style")) return;

    // Create a new <style> element
    const style = document.createElement("style");

    // Give it an ID so we can find/remove it later
    style.id = "yt-focus-style";

    // Add CSS rules as text
    style.textContent = `
        /* Hide EVERYTHING on the page */
        body * {
            visibility: hidden !important;
        }

        /* Make the video element visible again */
        video,
        video * {
            visibility: visible !important;
        }

        /* Ensure the video is above everything */
        video {
            position: relative !important;
            z-index: 9999 !important;
        }

        /* Make entire page background black */
        body {
            background: black !important;
        }
    `;

    // Append this style to the <head> of the page
    document.head.appendChild(style);
}


/**********************************************************************
 * FUNCTION: disableFocusMode()
 *
 * This removes the injected style tag,
 * restoring YouTube to normal.
 **********************************************************************/
function disableFocusMode() {

    // Find our injected style element
    const style = document.getElementById("yt-focus-style");

    // If it exists → remove it
    if (style) {
        style.remove();
    }
}


/**********************************************************************
 * LISTENER: Listen for messages from popup.js
 *
 * When you click the extension toggle,
 * popup.js sends a message here.
 **********************************************************************/
chrome.runtime.onMessage.addListener((message) => {

    // We only react to our specific message type
    if (message.type === "TOGGLE_FOCUS") {

        // Update our internal state
        focusEnabled = message.enabled;

        // Turn focus mode on or off
        if (focusEnabled) {
            enableFocusMode();
        } else {
            disableFocusMode();
        }
    }
});


/**********************************************************************
 * ON PAGE LOAD:
 * Check if focus mode was previously enabled.
 *
 * chrome.storage.sync stores data across sessions.
 **********************************************************************/
chrome.storage.sync.get(["focusEnabled"], (result) => {

    // If nothing stored yet → default to false
    focusEnabled = result.focusEnabled || false;

    // If it was enabled before → re-enable it
    if (focusEnabled) {
        enableFocusMode();
    }
});