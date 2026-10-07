/**
 * =====================================================================
 * PORTFOLIO VISITOR LOGGER  (Google Apps Script)
 * ---------------------------------------------------------------------
 * Receives a ping from your portfolio (tracker.js) whenever someone
 * visits, then:
 *   1. Appends the visit to a private Google Sheet ("Portfolio Log").
 *   2. Emails you an instant notification (throttled to ~1 per minute
 *      so a burst of traffic doesn't flood your inbox).
 *
 * SETUP: see NOTIFICATIONS-SETUP.md at the repo root.
 * =====================================================================
 */

/** ---- CONFIG ---- */
var CONFIG = {
  // Leave blank to email the owner account that runs the script.
  EMAIL_TO: '',

  // Leave blank to auto-create a spreadsheet. Or paste a spreadsheet ID
  // (from its URL: docs.google.com/spreadsheets/d/<THIS_ID>/edit)
  SPREADSHEET_ID: '',

  // Min seconds between notification emails (burst protection).
  EMAIL_COOLDOWN_SECONDS: 60,

  // 'instant' sends one email per unique page visit.
  NOTIFY_MODE: 'instant' // 'instant' | 'off'
};

var SPREADSHEET_KEY = 'PORTFOLIO_LOG_SPREADSHEET_ID';
var LAST_EMAIL_KEY = 'PORTFOLIO_LOG_LAST_EMAIL_TS';

/** Entry point — https://script.google.com/.../exec?page=/&title=... */
function doGet(e) {
  var p = e.parameter || {};
  try {
    var row = logToSheet(p);
    if (CONFIG.NOTIFY_MODE === 'instant') {
      maybeNotify(row);
    }
  } catch (err) {
    // Never fail loudly — a tracking blip shouldn't matter to the visitor.
  }
  return jsonp_(p, { ok: true });
}

/** Support GET with ?callback= for JSONP (used by tracker.js). */
function jsonp_(params, data) {
  var cb = params.callback;
  var out = ContentService.createTextOutput(JSON.stringify(data));
  if (cb) {
    out.setContent(cb + '(' + JSON.stringify(data) + ');');
    out.setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    out.setMimeType(ContentService.MimeType.JSON);
  }
  return out;
}

/** Append one row to the log spreadsheet. Returns the created row. */
function logToSheet(p) {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName('Views') || ss.insertSheet('Views');

  // Header row once
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Time (UTC)', 'Page', 'Page title', 'Referrer', 'Language',
      'Platform', 'Screen', 'Viewport', 'Timezone', 'User agent']);
  }

  var now = new Date();
  var row = [
    now.toISOString(),
    (p.page || '/'),
    (p.title || ''),
    (p.ref || ''),
    (p.lang || ''),
    (p.platform || ''),
    (p.screen || ''),
    (p.view || ''),
    (p.tz || ''),
    (p.ua || '')
  ];
  sheet.appendRow(row);
  return row;
}

function getSpreadsheet_() {
  var id = CONFIG.SPREADSHEET_ID || PropertiesService.getScriptProperties().getProperty(SPREADSHEET_KEY);
  if (id) {
    try { return SpreadsheetApp.openById(id); } catch (e) { /* fall through and create */ }
  }
  var ss = SpreadsheetApp.create('Muiz Portfolio — Visitor Log');
  PropertiesService.getScriptProperties().setProperty(SPREADSHEET_KEY, ss.getId());
  return ss;
}

/** Email the owner about a new view, throttled by EMAIL_COOLDOWN_SECONDS. */
function maybeNotify(row) {
  var props = PropertiesService.getScriptProperties();
  var last = Number(props.getProperty(LAST_EMAIL_KEY) || 0);
  var nowMs = Date.now();
  if (nowMs - last < CONFIG.EMAIL_COOLDOWN_SECONDS * 1000) return;

  var to = CONFIG.EMAIL_TO || Session.getActiveUser().getEmail();
  if (!to) return;

  var page = row[1] || '/';
  var when = new Date(row[0]).toUTCString();
  var subject = '👀 Someone viewed your portfolio — ' + page;
  var body = [
    'New visit to muheezabiola.github.io',
    '',
    '🕐 Time: ' + when,
    '📄 Page: ' + (row[1] || '/') + ' "' + (row[2] || '') + '"',
    '🔗 Referrer: ' + (row[3] || 'direct / none'),
    '🌐 Language: ' + (row[4] || '-'),
    '💻 Platform: ' + (row[5] || '-'),
    '🖥 Screen: ' + (row[6] || '-') + ' · Viewport: ' + (row[7] || '-'),
    '🕒 Timezone: ' + (row[8] || '-'),
    '',
    'Full history: your "Muiz Portfolio — Visitor Log" Google Sheet.',
    '',
    '— Muiz Portfolio auto-notifier'
  ].join('\n');

  MailApp.sendEmail({ to: to, subject: subject, body: body });
  props.setProperty(LAST_EMAIL_KEY, String(nowMs));
}

/** Convenience: open your log sheet (run manually from the editor). */
function openLogSpreadsheet() {
  var ss = getSpreadsheet_();
  Logger.log('Open this: ' + ss.getUrl());
  return ss.getUrl();
}
