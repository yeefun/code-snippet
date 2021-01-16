/* #opt, #debounce, #animation */

function rafWithDebounce(func) {
  let isTicking = false;

  return (function instantlySetRafWithDebounce() {
    if (isTicking) {
      return;
    }

    isTicking = true;

    window.requestAnimationFrame(doFunc);

    function doFunc() {
      func();
      isTicking = false;
    }
  })();
}
