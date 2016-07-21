$.extend(Suite.prototype, {
  testGetViewAPIs_BVS: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test("getAllBVS：获取全部的backgroundViewStore", function (assert) {
      var cache = self.create()
      var viewStores = cache.tabsMap[tabId].viewStores

      var result = cache.getAllBVS(tabId)

      var msg = ['Passed：', '获取全部的backgroundViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查全部的backgroundViewStore'].join('')
      assert.deepEqual(result.data, viewStores, msg)
    })

    QUnit.test("getCurrentBVS：获取当前的backgroundViewStore", function (assert) {
      var cache = self.create()
      var viewStores = cache.tabsMap[tabId].viewStores

      var result = cache.getCurrentBVS(tabId)

      var msg = ['Passed：', '获取当前的backgroundViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查当前的backgroundViewStore'].join('')
      assert.deepEqual(result.data, viewStores[viewStores.length - 1], msg)
    })

    QUnit.test("getSpecificBVS：获取指定的backgroundViewStore", function (assert) {
      var cache = self.create()
      var viewStores = cache.tabsMap[tabId].viewStores

      var specificIndex = 3
      var result = cache.getSpecificBVS(specificIndex, tabId)

      var msg = ['Passed：', '获取指定的backgroundViewStore[', specificIndex, ']'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查指定的backgroundViewStore[', specificIndex, ']'].join('')
      assert.deepEqual(result.data, viewStores[specificIndex], msg)
    })
  },

  testGetViewAPIs_UVS: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test("getAllUVS：获取全部的userViewStore", function (assert) {
      var cache = self.create()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var result = cache.getAllUVS(tabId)

      var msg = ['Passed：', '获取全部的userViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查全部的userViewStore'].join('')
      assert.deepEqual(result.data, viewStores, msg)
    })

    QUnit.test("getCurrentUVS：获取当前的userViewStore", function (assert) {
      var cache = self.create()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var result = cache.getCurrentUVS(tabId)

      var msg = ['Passed：', '获取当前的userViewStore'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查当前的userViewStore'].join('')
      assert.deepEqual(result.data, viewStores[viewStores.length - 1], msg)
    })

    QUnit.test("getSpecificUVS：获取指定的userViewStore", function (assert) {
      var cache = self.create()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var specificIndex = 3
      var result = cache.getSpecificUVS(specificIndex, tabId)

      var msg = ['Passed：', '获取指定的userViewStore[', specificIndex, ']'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查指定的userViewStore[', specificIndex, ']'].join('')
      assert.deepEqual(result.data, viewStores[specificIndex], msg)
    })
  }
})