/**
 * YouTube Cinema Focus – content.js v1.1.0
 * Only activates when:
 *   1. The user has enabled the extension via the popup
 *   2. YouTube is in Theater Mode
 */

(() => {
    const FOCUS_CLASS = 'ycf-focus-mode';
    const STYLE_ID = 'ycf-styles';
    const STORAGE_KEY = 'ycf_enabled';

    // ─── Extension state ─────────────────────────────────────────────────────────
    let extensionEnabled = false; // default: disabled until confirmed from storage

    // ─── CSS ─────────────────────────────────────────────────────────────────────
    const CSS = `
    body.${FOCUS_CLASS},
    body.${FOCUS_CLASS} #page-manager,
    body.${FOCUS_CLASS} ytd-app {
      background: #000 !important;
    }

    body.${FOCUS_CLASS} #masthead-container,
    body.${FOCUS_CLASS} ytd-masthead {
      opacity: 0 !important;
      pointer-events: none !important;
    }

    body.${FOCUS_CLASS} #secondary,
    body.${FOCUS_CLASS} #secondary-inner,
    body.${FOCUS_CLASS} ytd-watch-next-secondary-results-renderer {
      display: none !important;
    }

    body.${FOCUS_CLASS} #comments,
    body.${FOCUS_CLASS} ytd-comments {
      display: none !important;
    }

    body.${FOCUS_CLASS} #below,
    body.${FOCUS_CLASS} ytd-watch-metadata,
    body.${FOCUS_CLASS} #meta-contents,
    body.${FOCUS_CLASS} #description,
    body.${FOCUS_CLASS} ytd-expander,
    body.${FOCUS_CLASS} #actions,
    body.${FOCUS_CLASS} ytd-video-primary-info-renderer,
    body.${FOCUS_CLASS} ytd-video-secondary-info-renderer {
      display: none !important;
    }

    body.${FOCUS_CLASS} .ytp-ce-element,
    body.${FOCUS_CLASS} .ytp-endscreen-content {
      display: none !important;
    }

    body.${FOCUS_CLASS} #primary,
    body.${FOCUS_CLASS} #primary-inner {
      max-width: 100% !important;
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    body.${FOCUS_CLASS} #player-theater-container,
    body.${FOCUS_CLASS} #ytd-player,
    body.${FOCUS_CLASS} ytd-player {
      width: 100% !important;
      max-width: 100% !important;
      background: #000 !important;
    }

    body.${FOCUS_CLASS} video {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    body { transition: background 0.25s ease; }
  `;

    // ─── Style injection ──────────────────────────────────────────────────────────
    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = CSS;
        document.head.appendChild(style);
    }

    // ─── Theater Mode detection ───────────────────────────────────────────────────
    function isTheaterMode() {
        const flexy = document.querySelector('ytd-watch-flexy');
        return flexy ? flexy.hasAttribute('theater') : false;
    }

    // ─── Core: apply or remove focus mode ────────────────────────────────────────
    // Focus mode is ONLY active when BOTH conditions are true:
    //   - extensionEnabled === true
    //   - YouTube is in theater mode
    function syncFocusMode() {
        const shouldActivate = extensionEnabled && isTheaterMode();
        document.body.classList.toggle(FOCUS_CLASS, shouldActivate);
    }

    // ─── Clean up focus mode entirely (used when leaving watch pages) ────────────
    function deactivateFocusMode() {
        document.body.classList.remove(FOCUS_CLASS);
    }

    // ─── Watch ytd-watch-flexy for theater attribute changes ─────────────────────
    let playerObserver = null;

    function attachPlayerObserver() {
        const flexy = document.querySelector('ytd-watch-flexy');
        if (!flexy || playerObserver) return;

        playerObserver = new MutationObserver(syncFocusMode);
        playerObserver.observe(flexy, {
            attributes: true,
            attributeFilter: ['theater', 'default-layout']
        });

        syncFocusMode(); // immediate check on attach
    }

    function detachPlayerObserver() {
        if (playerObserver) {
            playerObserver.disconnect();
            playerObserver = null;
        }
    }

    // ─── SPA navigation handler ───────────────────────────────────────────────────
    function handleNavigation() {
        const onWatchPage = location.pathname.startsWith('/watch');

        if (!onWatchPage) {
            // Left the video — always remove focus mode and stop observing
            deactivateFocusMode();
            detachPlayerObserver();
        } else {
            // On a watch page — re-attach observer (it may have been torn down)
            detachPlayerObserver(); // clear stale observer first
            attachPlayerObserver();
        }
    }

    // YouTube fires this after every SPA navigation
    window.addEventListener('yt-navigate-finish', handleNavigation);

    // ─── Listen for enable/disable messages from the popup ───────────────────────
    chrome.runtime.onMessage.addListener((message) => {
        if (message.type === 'YCF_TOGGLE') {
            extensionEnabled = message.enabled;
            syncFocusMode();
        }
    });

    // ─── Bootstrap ────────────────────────────────────────────────────────────────
    function init() {
        injectStyles();

        // Read persisted state from storage before doing anything
        chrome.storage.local.get(STORAGE_KEY, (result) => {
            // Default to disabled if key doesn't exist yet
            extensionEnabled = result[STORAGE_KEY] === true;
            handleNavigation();

            // Watch for ytd-watch-flexy appearing via SPA render
            const bodyObserver = new MutationObserver(() => {
                if (document.querySelector('ytd-watch-flexy') && !playerObserver) {
                    attachPlayerObserver();
                }
            });
            bodyObserver.observe(document.body, { childList: true, subtree: false });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();