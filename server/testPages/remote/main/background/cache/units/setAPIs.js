$.extend(Suite.prototype, {
  testSetAPIs_BVS: function (cache, reset) {
    var self = this

    var tabId = self.config.mockData.tabId
    var viewStores = cache.tabsMap[tabId].viewStores

    QUnit.test("setInAllBVS：在全部的backgroundViewStore中设置某一属性等于某一值", function (assert) {
      var key = 'aNumber'
      var value = 10

      var result = cache.setInAllBVS(key, value, tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中设置属性(', key, ')等于值(', value, ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

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

      viewStores.forEach(function (viewStore, index) {
        if (index == viewStores.length - 1) {
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
  },

  testSetAPIs_UVS: function (cache, reset) {
    var self = this

    var tabId = self.config.mockData.tabId
    var viewStores = cache.userTabsMap[tabId].viewStores

    QUnit.test("setInAllUVS：在全部的userViewStore中设置某一属性等于某一值", function (assert) {
      var key = 'aNumber'
      var value = 10

      var result = cache.setInAllUVS(key, value, tabId)

      var msg = ['Passed：', '在全部的userViewStore中设置属性(', key, ')等于值(', value, ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值等于(', value, ')'].join('')
        assert.strictEqual(viewStore[key], value, msg)
      })
    })

    QUnit.test("setInCurrentUVS：在当前的userViewStore中设置某一属性等于某一值", function (assert) {
      var key = 'aString'
      var value = 'Chross'

      var result = cache.setInCurrentUVS(key, value, tabId)

      var msg = ['Passed：', '在当前的userViewStore中设置属性(', key, ')等于值(', value, ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == viewStores.length - 1) {
          var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值等于(', value, ')'].join('')
          assert.strictEqual(viewStore[key], value, msg)
        }
        else {
          var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值不等于(', value, ')'].join('')
          assert.notStrictEqual(viewStore[key], value, msg)
        }
      })
    })

    QUnit.test("setInSpecificUVS：在指定的userViewStore中设置某一属性等于某一值", function (assert) {
      var key = 'aArray'
      var value = [10, 'Chross']
      var specificIndex = 3

      var result = cache.setInSpecificUVS(key, value, specificIndex, tabId)

      var msg = ['Passed：', '在指定的userViewStore[', specificIndex, ']中设置属性(', key, ')等于值(', value, ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == specificIndex) {
          var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值等于(', value, ')'].join('')
          assert.strictEqual(viewStore[key], value, msg)
        }
        else {
          var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值不等于(', value, ')'].join('')
          assert.notStrictEqual(viewStore[key], value, msg)
        }
      })
    })

    reset && reset()
  }
})