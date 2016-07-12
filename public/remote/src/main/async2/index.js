if (!window.testAsync) {
  window.testAsync = {}
}
window.testAsync['async_2'] = 'async_2'
console.warn(JSON.stringify(window.testAsync, null, 2))