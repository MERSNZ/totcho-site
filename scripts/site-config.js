/* Launch switch. One place controls the store buttons.
   appStatus: "beta" | "live"

   beta — "Get Tot for iPhone / Android" buttons, the tester dialog,
          and the /beta/ page (this file also loads /scripts/beta.js).
   live — those buttons become the App Store and Google Play badges,
          the "Now in beta" note is hidden, /scripts/beta.js is not loaded,
          and /beta/ redirects to /.

   Store URLs below are written onto the badge links. The badge artwork
   stays in /images/badges/.

   This switch does not rewrite page copy. At launch, also change by hand:
   - /faq/ first question "Can I download Tot now?" and its FAQPage JSON-LD
   - /how-it-works/ "Getting set up", step 1. Revert to:
     "Download Tot from the App Store or Google Play."
*/
(function () {
  var appStatus = "beta";
  var appStoreUrl = "#"; // TODO: App Store URL
  var playStoreUrl = "https://play.google.com/store/apps/details?id=app.totcho.tot";

  document.documentElement.setAttribute("data-app-status", appStatus);

  function isBetaPage() {
    var path = location.pathname.replace(/index\.html$/, "");
    if (path.charAt(path.length - 1) !== "/") path += "/";
    return path.lastIndexOf("/beta/") === path.length - 6;
  }

  if (appStatus === "live" && isBetaPage()) {
    location.replace("/");
    return;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var appLinks = document.querySelectorAll("[data-store='app-store']");
    var playLinks = document.querySelectorAll("[data-store='play-store']");
    var i;
    for (i = 0; i < appLinks.length; i++) appLinks[i].href = appStoreUrl;
    for (i = 0; i < playLinks.length; i++) playLinks[i].href = playStoreUrl;
  });

  if (appStatus !== "beta" || isBetaPage()) return;

  var script = document.createElement("script");
  script.src = "/scripts/beta.js";
  document.head.appendChild(script);
})();
