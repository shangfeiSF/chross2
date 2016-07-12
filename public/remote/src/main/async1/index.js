if (!window.testAsync) {
  window.testAsync = {}
}
window.testAsync['async_1'] = 'async_1'
console.warn(JSON.stringify(window.testAsync, null, 2))