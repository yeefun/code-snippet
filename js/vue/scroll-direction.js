/* #scroll, #direction, #composition */

function useScrollDirection() {
  const doesScrollDown = ref(false)
  let beforeScrollHeight = 0

  onMounted(() => {
    window.addEventListener('scroll', detectScrollDirection)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', detectScrollDirection)
  })

  function detectScrollDirection() {
    const { pageYOffset: currentScrollHeight } = window
    const diffScrollHeight = currentScrollHeight - beforeScrollHeight

    doesScrollDown.value = diffScrollHeight >= 0

    beforeScrollHeight = currentScrollHeight
  }

  return doesScrollDown
}
