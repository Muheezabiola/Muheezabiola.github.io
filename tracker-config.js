/* =====================================================================
   VISITOR TRACKER CONFIG
   ---------------------------------------------------------------------
   1. Follow the guide in NOTIFICATIONS-SETUP.md to deploy the Google
      Apps Script web app (notifications/VisitorLogger.gs).
   2. Paste the web app URL below (between the quotes).
   3. Commit + push. You're done — every new visitor logs to your
      private Google Sheet and emails you.
   ===================================================================== */

window.TRACKER_CONFIG = {
    enabled: true,

    // TODO: replace with your deployed Apps Script Web App URL
    endpoint: "",

    // Extra details sent with each view (helpful but not required)
    includeMeta: true
};
