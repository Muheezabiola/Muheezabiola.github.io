/* =====================================================================
   VISITOR TRACKER — fires once per page per browser session.
   Sends a small ping to your Google Apps Script web app (via JSONP,
   which works on static GitHub Pages without CORS issues).
   If no endpoint is configured, this file does nothing.
   ===================================================================== */
(function () {
    'use strict';

    var cfg = window.TRACKER_CONFIG || {};
    if (!cfg.enabled || !cfg.endpoint) return; // not configured yet — safe no-op

    // Only log each unique page once per session (no spam on refresh)
    var key = 'vt_' + location.pathname;
    try {
        if (sessionStorage.getItem(key)) return;
        sessionStorage.setItem(key, '1');
    } catch (e) { /* storage unavailable — still send */ }

    var payload = {
        ts: Date.now(),
        page: location.pathname + location.search,
        title: document.title,
        ref: document.referrer || '',
        lang: (navigator.language || ''),
        platform: (navigator.platform || ''),
        screen: (window.screen && screen.width ? screen.width + 'x' + screen.height : ''),
        view: (window.innerWidth ? window.innerWidth + 'x' + window.innerHeight : ''),
        tz: (function () { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { return ''; } })(),
        ua: navigator.userAgent
    };

    var cbName = 'vtcb' + Math.floor(Math.random() * 1e9);
    var q = [];
    for (var k in payload) q.push(k + '=' + encodeURIComponent(payload[k]));

    var endpoint = cfg.endpoint + (cfg.endpoint.indexOf('?') > -1 ? '&' : '?') + 'callback=' + cbName + '&' + q.join('&');

    window[cbName] = cleanup;
    var s = document.createElement('script');
    s.src = endpoint;
    s.id = 'vtp' + cbName;
    s.onerror = cleanup;
    document.body.appendChild(s);

    // Safety timeout in case the request hangs
    setTimeout(cleanup, 5000);

    function cleanup() {
        try {
            var el = document.getElementById('vtp' + cbName);
            if (el && el.parentNode) el.parentNode.removeChild(el);
        } catch (e) { /* ignore */ }
        if (window[cbName]) window[cbName] = undefined;
    }
})();
