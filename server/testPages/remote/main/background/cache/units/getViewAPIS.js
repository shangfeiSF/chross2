$.extend(Suite.prototype, {
  testGetViewAPIs: function (cache, reset) {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test("getAllBVS：获取全部的backgroundViewStore", function (assert) {
      var allViewStores = self.config.mockData.tabStore.viewStores
      var result = cache.getAllBVS(tabId)

      var msg = ['Passed：', '获取全部的backgroundViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查全部的backgroundViewStore'].join('')
      assert.deepEqual(result.data, allViewStores, msg)
    })

    QUnit.test("getCurrentBVS：获取当前的backgroundViewStore", function (assert) {
      var allViewStores = self.config.mockData.tabStore.viewStores
      var result = cache.getCurrentBVS(tabId)

      var msg = ['Passed：', '获取当前的backgroundViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查当前的backgroundViewStore'].join('')
      assert.deepEqual(result.data, allViewStores[allViewStores.length - 1], msg)
    })

    QUnit.test("getSpecificBVS：获取指定的backgroundViewStore", function (assert) {
      var allViewStores = self.config.mockData.tabStore.viewStores
      var specificIndex = 3
      var result = cache.getSpecificBVS(specificIndex, tabId)

      var msg = ['Passed：', '获取指定的backgroundViewStore[', specificIndex, ']'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查指定的backgroundViewStore[', specificIndex, ']'].join('')
      assert.deepEqual(result.data, allViewStores[specificIndex], msg)
    })

    reset && reset()
  }
})