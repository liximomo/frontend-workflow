(function(doc, win) {
  const docEle = doc.documentElement;
  const evt = "onorientationchange" in window ? "orientationchange" : "resize",
  fn = function() {
    let width = Math.max(docEle.clientWidth, window.innerWidth || 0);
    if (width) {
      width = Math.min(width, 640);
      docEle.style.fontSize = 20 * (width / 320) + "px";
    }
  };
   
  win.addEventListener(evt, fn, false);
  doc.addEventListener("DOMContentLoaded", fn, false);
 
}(document, window))