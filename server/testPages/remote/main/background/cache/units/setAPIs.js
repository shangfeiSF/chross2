$.extend(Suite.prototype, {
  testSetAPIs: function (cache, reset) {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test("setInAllBVS：在全部的backgroundViewStore中设置某一属性等于某一值", function (assert) {
      var key = 'aNumber'
      var value = 10

      var result = cache.setInAllBVS(key, value, tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中设置属性(', key, ')等于值(', value, ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var viewStores = cache.tabsMap[tabId].viewStores
      viewStores.forEach(function (viewStore, index) {
        var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', value, ')'].join('')
        assert.strictEqual(viewStore[key], value, msg)
      })
    })

    QUnit.test("setInCurrentBVS：在当前的backgroundViewStore中设置某一属性等于某一值", function (assert) {
      var key = 'aString'
      var value = 'Chross'

      var result = cache.setInCurrentBVS(key, value, tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中设置属性(', key, ')等于值(', value, ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var viewStores = cache.tabsMap[tabId].viewStores
      var length = viewStores.length
      viewStores.forEach(function (viewStore, index) {
        if (index == length - 1) {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', value, ')'].join('')
          assert.strictEqual(viewStore[key], value, msg)
        }
        else {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值不等于(', value, ')'].join('')
          assert.notStrictEqual(viewStore[key], value, msg)
        }
      })
    })

    QUnit.test("setInSpecificBVS：在指定的backgroundViewStore中设置某一属性等于某一值", function (assert) {
      var key = 'aArray'
      var value = [10, 'Chross']
      var specificIndex = 3

      var result = cache.setInSpecificBVS(key, value, specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中设置属性(', key, ')等于值(', value, ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var viewStores = cache.tabsMap[tabId].viewStores
      viewStores.forEach(function (viewStore, index) {
        if (index == specificIndex) {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', value, ')'].join('')
          assert.strictEqual(viewStore[key], value, msg)
        }
        else {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值不等于(', value, ')'].join('')
          assert.notStrictEqual(viewStore[key], value, msg)
        }
      })
    })

    reset && reset()
  }
})