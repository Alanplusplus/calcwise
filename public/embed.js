/*! CalcWise embed helper - resizes CalcWise calculator iframes to fit their content.
 * Optional: the iframe snippet works without this script, it just keeps a fixed height.
 * The script only changes the height of iframes that send it a resize message. */
(function () {
  var origin = "https://www.calcwise.tools";
  try {
    var current = document.currentScript;
    if (current && current.src) origin = new URL(current.src).origin;
  } catch (err) {}

  window.addEventListener("message", function (event) {
    if (event.origin !== origin) return;
    var data = event.data;
    if (!data || data.type !== "calcwise:resize" || typeof data.height !== "number") return;

    var frames = document.getElementsByTagName("iframe");
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === event.source) {
        var height = Math.max(200, Math.min(Math.ceil(data.height), 4000));
        frames[i].style.height = height + "px";
        frames[i].setAttribute("height", String(height));
      }
    }
  });
})();
