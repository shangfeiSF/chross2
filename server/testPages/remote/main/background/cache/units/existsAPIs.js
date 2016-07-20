$.extend(Suite.prototype, {
  testExiistsAPIs_BVS: function () {
    var self = this
    var cache = self.cache

    var tabId = self.config.mockData.tabId

    QUnit.test("existsInAllBVS：在全部的backgroundViewStore中检查某一属性是否存在", function (assert) {
      var key = 'timeStamp'

      var result = cache.existsInAllBVS(key, tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中检查属性(', key, ')是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      result.data.forEach(function (exists, index) {
        var msg = ['Passed：', '在backgroundViewStore[', index, ']中存在属性(', key, ')'].join('')
        assert.strictEqual(exists, true, msg)
      })
    })

    QUnit.test("existsInCurrentBVS：在当前的backgroundViewStore中检查某一属性是否存在", function (assert) {
      var key = 'onBeforeRequest'

      var result = cache.existsInCurrentBVS(key, tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中检查属性(', key, ')是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在当前的backgroundViewStore中存在属性(', key, ')'].join('')
      assert.strictEqual(result.data, true, msg)
    })

    QUnit.test("existsInSpecificBVS：在指定的backgroundViewStore中检查某一属性存在性", function (assert) {
      var key = 'onBeforeRedirect'
      var specificIndex = 3

      var result = cache.existsInSpecificBVS(key, specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中检查属性(', key, ')是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中不存在属性(', key, ')'].join('')
      assert.strictEqual(result.data, false, msg)
    })

    self.reset()
  },

  testExiistsAPIs_UVS: function () {
    var self = this
    var cache = self.cache

    var tabId = self.config.mockData.tabId

    QUnit.test("existsInAllUVS：在全部的userViewStore中检查某一属性是否存在", function (assert) {
      var key = 'userName'
      var expected = [true, true, false, true, false]

      var result = cache.existsInAllUVS(key, tabId)

      var msg = ['Passed：', '在全部的userViewStore中检查属性(', key, ')是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      result.data.forEach(function (exists, index) {
        var msg = ['Passed：', '检查在userViewStore[', index, ']中', expected[index] ? '存在' : '不存在', '属性(', key, ')'].join('')
        assert.strictEqual(exists, expected[index], msg)
      })
    })

    QUnit.test("existsInCurrentUVS：在当前的userViewStore中检查某一属性是否存在", function (assert) {
      var key = 'userId'

      var result = cache.existsInCurrentUVS(key, tabId)

      var msg = ['Passed：', '在当前的userViewStore中检查属性(', key, ')是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在当前的userViewStore中不存在属性(', key, ')'].join('')
      assert.strictEqual(result.data, false, msg)
    })

    QUnit.test("existsInSpecificUVS：在指定的userViewStore中检查某一属性存在性", function (assert) {
      var key = 'userInfo'
      var specificIndex = 3

      var result = cache.existsInSpecificUVS(key, specificIndex, tabId)

      var msg = ['Passed：', '在指定的userViewStore[', specificIndex, ']中检查属性(', key, ')是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在指定的userViewStore[', specificIndex, ']中不存在属性(', key, ')'].join('')
      assert.strictEqual(result.data, false, msg)
    })

    self.reset()
  }
})