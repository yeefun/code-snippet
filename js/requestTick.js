/**
 * requestTick
 * #opt #animation
 */

 function requestTick (fn) {
  let ticking = false
  const wEl = window

  return (function IIFE () {
    if (ticking) {
      return
    }

    ticking = true

    wEl.requestAnimationFrame(function () {
      fn()
      ticking = false
    })
  })()
}
