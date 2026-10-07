# 🔔 Visitor Notifications — Setup Guide (10 minutes, free)

Your portfolio already sends a tiny "ping" on every page visit (`tracker.js`).
Right now it's switched off because it needs **one URL** from a free Google
Apps Script you'll create below. Once you paste that URL, every new visitor:

1. gets logged (time, page, referrer, device, timezone) to a **private Google
   Sheet** that's auto-created in your Google Drive, and
2. triggers an **email to your Gmail** (burst-protected to ~1 per minute).

No server, no cost, no new accounts — this reuses the Google account you
already have.

---

## Step 1 — Create the Apps Script

1. Go to <https://script.google.com/home> and sign in with your Gmail
   (`muheezabiola99@gmail.com`).
2. Click **New project** → name it `Portfolio Visitor Log`.
3. Delete the default `Code.gs` content and paste in the full contents of
   [`notifications/VisitorLogger.gs`](notifications/VisitorLogger.gs) from this
   repo.
4. Click **Save** (💾 icon).

## Step 2 — Deploy as a web app

1. Click **Deploy ▾ → New deployment**.
2. Click the ⚙️ next to **Select type** → choose **Web app**.
3. Fill in:
   - **Description**: `Visitor logger`
   - **Execute as**: `Me (muheezabiola99@gmail.com)`
   - **Who has access**: `Anyone`
4. Click **Deploy**.
5. Google will ask you to **authorize** the script — click through the
   permissions (it needs to write to your Sheets and send email as you).
6. Copy the **Web app URL** — it looks like
   `https://script.google.com/macros/s/AKfycb.../exec`.

> ⚠️ Keep this window open — if you ever click **Deploy → Manage deployments →
> Edit → New version**, the URL changes and you must update Step 3.

## Step 3 — Paste the URL into your site

1. Open [`tracker-config.js`](tracker-config.js) in this repo.
2. Put your URL between the quotes:

```js
endpoint: "https://script.google.com/macros/s/AKfycb.../exec",
```

3. Commit & push to GitHub. GitHub Pages will update automatically.

## Step 4 — Test it

1. Open your live site (`https://muheezabiola.github.io/`) — or just reload it.
2. Within a minute you should receive an **email notification**, and a new
   spreadsheet called **"Muiz Portfolio — Visitor Log"** appears in your Google
   Drive with a row for the visit.
3. (Optional) Open the Apps Script editor and run the `openLogSpreadsheet`
   function to jump straight to the sheet.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| No email / no row | Confirm `endpoint` is the exact **Web app URL** (ends in `/exec`) and you deployed with **Execute as: Me**, **Access: Anyone**. |
| URL changed after editing script | Apps Script asks you to create a **new version** — update `tracker-config.js` with the new `/exec` URL. |
| Emails feel spammy in a traffic burst | The script auto-throttles to 1 email/minute. For quieter digests, set `NOTIFY_MODE: 'off'` in the script and check the Sheet instead. |
| You only want the log, no emails | In `VisitorLogger.gs`, set `NOTIFY_MODE: 'off'`. |

## Privacy note

The tracker stores no cookies and only records what your own analytics would:
page, time, referrer, screen size, language, timezone and user-agent. No
personal identifying data is collected or shared.
