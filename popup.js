/**********************************************************************
 * YouTube Cinema Focus - popup.js
 *
 * This file controls the popup button and communicates with content.js
 **********************************************************************/

// Get reference to the button in popup.html
const toggleButton = document.getElementById("toggleButton");

// Variable to keep current state
let focusEnabled = false;


/**********************************************************************
 * FUNCTION: updateButtonText()
 *
 * Updates button text depending on focus state
 **********************************************************************/
function updateButtonText() {
    toggleButton.textContent = focusEnabled ? "Focus ON" : "Focus OFF";
}


/**********************************************************************
 * FUNCTION: toggleFocusMode()
 *
 * Called when button is clicked
 **********************************************************************/
function toggleFocusMode() {

    // Toggle the state
    focusEnabled = !focusEnabled;

    // Save the new state in chrome.storage
    chrome.storage.sync.set({ focusEnabled }, () => {
        console.log("Focus mode set to", focusEnabled);
    });

    // Send a message to content.js on the current tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        // tabs[0] is the currently active tab
        chrome.tabs.sendMessage(tabs[0].id, {
            type: "TOGGLE_FOCUS",
            enabled: focusEnabled
        });
    });

    // Update the button text
    updateButtonText();
}


/**********************************************************************
 * INITIALIZE POPUP
 *
 * Load saved state from chrome.storage and update button text
 **********************************************************************/
chrome.storage.sync.get(["focusEnabled"], (result) => {
    focusEnabled = result.focusEnabled || false;
    updateButtonText();
});


/**********************************************************************
 * ADD CLICK EVENT LISTENER
 *
 * When user clicks the button → toggle focus mode
 **********************************************************************/
toggleButton.addEventListener("click", toggleFocusMode);