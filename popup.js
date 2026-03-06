const STORAGE_KEY = 'ycf_enabled';

const toggle = document.getElementById('toggle');
const statusText = document.getElementById('status-text');

// ─── Update UI to reflect current state ──────────────────────────────────────
function updateUI(enabled) {
    toggle.checked = enabled;
    statusText.textContent = enabled ? 'Enabled' : 'Disabled';
    statusText.style.color = enabled ? '#cc0000' : '#555';
}

// ─── Send message to content script on the active YouTube tab ────────────────
function notifyContentScript(enabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab && tab.url && tab.url.includes('youtube.com')) {
            chrome.tabs.sendMessage(tab.id, { type: 'YCF_TOGGLE', enabled });
        }
    });
}

// ─── Load saved state on popup open ──────────────────────────────────────────
chrome.storage.local.get(STORAGE_KEY, (result) => {
    const enabled = result[STORAGE_KEY] === true;
    updateUI(enabled);
});

// ─── Handle toggle click ──────────────────────────────────────────────────────
toggle.addEventListener('change', () => {
    const enabled = toggle.checked;

    // Persist state
    chrome.storage.local.set({ [STORAGE_KEY]: enabled });

    // Update UI
    updateUI(enabled);

    // Notify content script immediately
    notifyContentScript(enabled);
});