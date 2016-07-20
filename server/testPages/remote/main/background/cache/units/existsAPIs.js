$.extend(Suite.prototype, {
  testExiistsAPIs: function (cache, reset) {
    var self = this
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

      var msg = ['Passed：', '在指定的backgroundViewStore[',specificIndex,']中检查属性(', key, ')是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在指定的backgroundViewStore[',specificIndex,']中不存在属性(', key, ')'].join('')
      assert.strictEqual(result.data, false, msg)
    })

    reset && reset()
  }
})