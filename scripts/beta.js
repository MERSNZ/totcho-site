(function () {
  if (typeof HTMLDialogElement === "undefined") return;

  var titles = {
    iPhone: "Join the iOS beta",
    Android: "Join the Android beta"
  };

  function init() {
    var dialog = document.getElementById("beta-dialog");
    if (!dialog || !dialog.showModal) return;
    var last = null;
    var title = document.getElementById("beta-dialog-title");
    var panels = {
      iPhone: dialog.querySelector("[data-beta-panel='ios']"),
      Android: dialog.querySelector("[data-beta-panel='android']")
    };
    var closeBtn = document.getElementById("beta-close");

    document.querySelectorAll("a[data-beta-platform]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        var platform = link.getAttribute("data-beta-platform");
        if (!panels[platform]) return;
        event.preventDefault();
        Object.keys(panels).forEach(function (key) {
          if (panels[key]) panels[key].hidden = key !== platform;
        });
        if (title && titles[platform]) title.textContent = titles[platform];
        last = link;
        dialog.showModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        dialog.close();
      });
    }
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
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
