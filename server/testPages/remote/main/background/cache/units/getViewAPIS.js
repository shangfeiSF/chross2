$.extend(Suite.prototype, {
  testGetViewAPIs_BVS: function () {
    var self = this
    var cache = self.cache

    var tabId = self.config.mockData.tabId
    var allViewStores = self.config.mockData.tabStore.viewStores

    QUnit.test("getAllBVS：获取全部的backgroundViewStore", function (assert) {
      var result = cache.getAllBVS(tabId)

      var msg = ['Passed：', '获取全部的backgroundViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查全部的backgroundViewStore'].join('')
      assert.deepEqual(result.data, allViewStores, msg)
    })

    QUnit.test("getCurrentBVS：获取当前的backgroundViewStore", function (assert) {
      var result = cache.getCurrentBVS(tabId)

      var msg = ['Passed：', '获取当前的backgroundViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查当前的backgroundViewStore'].join('')
      assert.deepEqual(result.data, allViewStores[allViewStores.length - 1], msg)
    })

    QUnit.test("getSpecificBVS：获取指定的backgroundViewStore", function (assert) {
      var specificIndex = 3
      var result = cache.getSpecificBVS(specificIndex, tabId)

      var msg = ['Passed：', '获取指定的backgroundViewStore[', specificIndex, ']'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查指定的backgroundViewStore[', specificIndex, ']'].join('')
      assert.deepEqual(result.data, allViewStores[specificIndex], msg)
    })

    self.reset()
  },

  testGetViewAPIs_UVS: function () {
    var self = this
    var cache = self.cache

    var tabId = self.config.mockData.tabId
    var allViewStores = self.config.mockData.userTabsMap.viewStores

    QUnit.test("getAllUVS：获取全部的userViewStore", function (assert) {
      var result = cache.getAllUVS(tabId)

      var msg = ['Passed：', '获取全部的userViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查全部的userViewStore'].join('')
      assert.deepEqual(result.data, allViewStores, msg)
    })

    QUnit.test("getCurrentUVS：获取当前的userViewStore", function (assert) {
      var result = cache.getCurrentUVS(tabId)

      var msg = ['Passed：', '获取当前的userViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查当前的userViewStore'].join('')
      assert.deepEqual(result.data, allViewStores[allViewStores.length - 1], msg)
    })

    QUnit.test("getSpecificUVS：获取指定的userViewStore", function (assert) {
      var specificIndex = 3
      var result = cache.getSpecificUVS(specificIndex, tabId)

      var msg = ['Passed：', '获取指定的userViewStore[', specificIndex, ']'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查指定的userViewStore[', specificIndex, ']'].join('')
      assert.deepEqual(result.data, allViewStores[specificIndex], msg)
    })

    self.reset()
  }
})