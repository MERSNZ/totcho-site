/* Launch switch. One place controls the store buttons and beta links.
   appStatus: "beta" | "live"

   beta — "Join the iOS / Android beta" buttons, the tester dialog,
          and the /beta/ page (this file also loads /scripts/beta.js).
   live — those buttons become the App Store and Google Play badges,
          the "Now in beta" note is hidden, /scripts/beta.js is not loaded,
          and /beta/ redirects to /.

   Store URLs below are written onto the badge links. The badge artwork
   stays in /images/badges/. Beta URLs are written onto [data-beta-link].

   This switch does not rewrite page copy. At launch, also change by hand:
   - /faq/ first question "Can I download Tot now?" and its FAQPage JSON-LD
   - /how-it-works/ "Getting set up", step 1. Revert to:
     "Download Tot from the App Store or Google Play."
*/
(function () {
  var appStatus = "beta";
  var appStoreUrl = "#"; // TODO: App Store URL
  var playStoreUrl = "https://play.google.com/store/apps/details?id=app.totcho.tot";

  var IOS_BETA_URL = "https://testflight.apple.com/join/Cd5NnBy5";
  var ANDROID_GROUP_URL = "https://groups.google.com/g/tot-beta/about";
  var ANDROID_OPTIN_URL = "https://play.google.com/apps/testing/app.totcho.tot";
  var TESTFLIGHT_APP_URL = "https://apps.apple.com/app/testflight/id899247664";

  var betaLinks = {
    ios: IOS_BETA_URL,
    "android-group": ANDROID_GROUP_URL,
    "android-optin": ANDROID_OPTIN_URL,
    "testflight-app": TESTFLIGHT_APP_URL
  };

  document.documentElement.setAttribute("data-app-status", appStatus);
  document.documentElement.setAttribute("data-device", deviceKind());

  function deviceKind() {
    var ua = navigator.userAgent || "";
    // iPadOS 13+ reports itself as a Mac. A touch-capable Macintosh is an iPad.
    var iPadAsMac = /Macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    if (/iPad|iPhone|iPod/.test(ua) || iPadAsMac) return "ios";
    if (/Android/.test(ua)) return "android";
    return "desktop";
  }

  function isBetaPage() {
    var path = location.pathname.replace(/index\.html$/, "");
    if (path.charAt(path.length - 1) !== "/") path += "/";
    return path.length >= 6 && path.lastIndexOf("/beta/") === path.length - 6;
  }

  if (appStatus === "live" && isBetaPage()) {
    location.replace("/");
    return;
  }

  if (isBetaPage() && typeof URLSearchParams !== "undefined") {
    var focus = new URLSearchParams(location.search).get("platform");
    if (focus === "iphone" || focus === "android") {
      document.documentElement.setAttribute("data-beta-focus", focus);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var appLinks = document.querySelectorAll("[data-store='app-store']");
    var playLinks = document.querySelectorAll("[data-store='play-store']");
    var i;
    for (i = 0; i < appLinks.length; i++) appLinks[i].href = appStoreUrl;
    for (i = 0; i < playLinks.length; i++) playLinks[i].href = playStoreUrl;

    var links = document.querySelectorAll("[data-beta-link]");
    for (i = 0; i < links.length; i++) {
      var key = links[i].getAttribute("data-beta-link");
      if (betaLinks[key]) links[i].href = betaLinks[key];
    }
  });

  if (appStatus !== "beta" || isBetaPage()) return;

  var script = document.createElement("script");
  script.src = "/scripts/beta.js?v=2";
  document.head.appendChild(script);
})();
