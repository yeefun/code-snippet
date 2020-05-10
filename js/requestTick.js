/**
 * requestTick
 * #opt #animation
 */

let ticking = false

function requestTick(fn) {
  if (ticking) {
    return
  }

  ticking = true

  window.requestAnimationFrame(function callFn() {
    fn()
    ticking = false
  })
}
