(function () {
  if (typeof HTMLDialogElement === "undefined") return;
  var accounts = { iPhone: "Apple ID", Android: "Google Play account" };

  function href(platform) {
    var line = platform === "iPhone" ? "Apple ID email:" : "Google Play account email:";
    var body =
      "Hi, I'd like to test Tot.\r\n\r\nPhone: " +
      platform +
      "\r\n" +
      line +
      "\r\n\r\nAnything else you'd like to tell us (optional):\r\n";
    return (
      "mailto:hello@totcho.app?subject=" +
      encodeURIComponent("Tot beta tester \u2013 " + platform) +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  function init() {
    var dialog = document.getElementById("beta-dialog");
    if (!dialog || !dialog.showModal) return;
    var last = null;
    var copyBtn = document.getElementById("beta-copy");
    var mail = document.getElementById("beta-mailto");

    document.querySelectorAll("[data-beta-platform]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var platform = link.getAttribute("data-beta-platform");
        if (!accounts[platform]) return;
        event.preventDefault();
        dialog.querySelector("[data-beta-slot=platform]").textContent = platform;
        dialog.querySelector("[data-beta-slot=account]").textContent = accounts[platform];
        mail.href = href(platform);
        last = link;
        dialog.showModal();
      });
    });

    document.getElementById("beta-close").addEventListener("click", function () {
      dialog.close();
    });
    dialog.addEventListener("click", function (event) {
      var box = dialog.getBoundingClientRect();
      if (
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom
      )
        dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (last) last.focus();
    });

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      copyBtn.hidden = true;
      return;
    }
    var timer;
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText("hello@totcho.app").then(function () {
        copyBtn.textContent = "Copied";
        clearTimeout(timer);
        timer = setTimeout(function () {
          copyBtn.textContent = "Copy";
        }, 2000);
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
