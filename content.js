/**
 * YouTube Cinema Focus – content.js
 * Automatically activates cinema-style Focus Mode when Theater Mode is detected.
 */

(() => {
    const FOCUS_CLASS = 'ycf-focus-mode';
    const STYLE_ID = 'ycf-styles';

    // ─── CSS injected into the page ─────────────────────────────────────────────
    const CSS = `
    /* ── Base reset ─────────────────────────────────────────────── */
    body.${FOCUS_CLASS},
    body.${FOCUS_CLASS} #page-manager,
    body.${FOCUS_CLASS} ytd-app {
      background: #000 !important;
    }

    /* ── Hide everything at the masthead / header level ─────────── */
    body.${FOCUS_CLASS} #masthead-container,
    body.${FOCUS_CLASS} ytd-masthead {
      opacity: 0 !important;
      pointer-events: none !important;
    }

    /* ── Hide sidebar / secondary panel ─────────────────────────── */
    body.${FOCUS_CLASS} #secondary,
    body.${FOCUS_CLASS} #secondary-inner,
    body.${FOCUS_CLASS} ytd-watch-next-secondary-results-renderer {
      display: none !important;
    }

    /* ── Hide comments ───────────────────────────────────────────── */
    body.${FOCUS_CLASS} #comments,
    body.${FOCUS_CLASS} ytd-comments {
      display: none !important;
    }

    /* ── Hide below-player metadata (description, chapters, etc.) ── */
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

    /* ── Hide end-screen recommendations ────────────────────────── */
    body.${FOCUS_CLASS} .ytp-ce-element,
    body.${FOCUS_CLASS} .ytp-endscreen-content {
      display: none !important;
    }

    /* ── Keep the primary content column filling the viewport ────── */
    body.${FOCUS_CLASS} #primary,
    body.${FOCUS_CLASS} #primary-inner {
      max-width: 100% !important;
      width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }

    /* ── Make the player container fill the space ───────────────── */
    body.${FOCUS_CLASS} #player-theater-container,
    body.${FOCUS_CLASS} #ytd-player,
    body.${FOCUS_CLASS} ytd-player {
      width: 100% !important;
      max-width: 100% !important;
      background: #000 !important;
    }

    /* ── Ensure the video itself is fully visible ───────────────── */
    body.${FOCUS_CLASS} video {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }

    /* ── Smooth transition when toggling ────────────────────────── */
    body {
      transition: background 0.25s ease;
    }
  `;

    // ─── Inject styles once ──────────────────────────────────────────────────────
    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = CSS;
        document.head.appendChild(style);
    }

    // ─── Theater Mode detection ──────────────────────────────────────────────────
    /**
     * YouTube marks theater mode on <ytd-watch-flexy> via the
     * `theater` boolean attribute. We watch that element for changes.
     */
    function isTheaterMode() {
        const flexy = document.querySelector('ytd-watch-flexy');
        return flexy ? flexy.hasAttribute('theater') : false;
    }

    function applyFocusMode(active) {
        document.body.classList.toggle(FOCUS_CLASS, active);
    }

    function syncFocusMode() {
        applyFocusMode(isTheaterMode());
    }

    // ─── Watch the player element for attribute changes ──────────────────────────
    let playerObserver = null;

    function attachPlayerObserver() {
        const flexy = document.querySelector('ytd-watch-flexy');
        if (!flexy || playerObserver) return;

        playerObserver = new MutationObserver(syncFocusMode);
        playerObserver.observe(flexy, { attributes: true, attributeFilter: ['theater', 'default-layout'] });
        syncFocusMode(); // run once immediately
    }

    // ─── Handle YouTube SPA navigation ──────────────────────────────────────────
    /**
     * YouTube is a SPA; it doesn't do full page reloads between videos.
     * We watch the document body for DOM changes that signal a new page
     * has been rendered, then re-attach the player observer.
     */
    let spaObserver = null;

    function attachSPAObserver() {
        if (spaObserver) return;

        spaObserver = new MutationObserver(() => {
            // Re-attach player observer whenever the DOM mutates substantially
            if (!document.querySelector('ytd-watch-flexy') || playerObserver) return;
            // ytd-watch-flexy just appeared – wire it up
            attachPlayerObserver();
        });

        spaObserver.observe(document.body, { childList: true, subtree: false });
    }

    // ─── Cleanup when navigating away from a watch page ─────────────────────────
    function handleNavigation() {
        const onWatchPage = location.pathname.startsWith('/watch');

        if (!onWatchPage) {
            // Left the video page – ensure focus mode is off
            applyFocusMode(false);
            if (playerObserver) {
                playerObserver.disconnect();
                playerObserver = null;
            }
        } else {
            // Arrived (or returned) to a watch page
            attachPlayerObserver();
        }
    }

    // YouTube fires a custom "yt-navigate-finish" event after SPA navigation
    window.addEventListener('yt-navigate-finish', () => {
        // Reset player observer so it can re-attach to the new page's element
        if (playerObserver) {
            playerObserver.disconnect();
            playerObserver = null;
        }
        handleNavigation();
    });

    // ─── Bootstrap ───────────────────────────────────────────────────────────────
    function init() {
        injectStyles();
        attachSPAObserver();
        handleNavigation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();