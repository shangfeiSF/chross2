$.extend(Suite.prototype, {
  testRecordAPIs_BVS: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test("recordInAllBVS：在全部的backgroundViewStore中为某一属性新添一个值", function (assert) {
      var cache = self.create()
      var viewStores = cache.tabsMap[tabId].viewStores

      var key = 'someNumbers'
      var values = [10, 20]

      var result = cache.recordInAllBVS(key, values[0], tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中创建属性(', key, ')并新添一个值等于(', values[0], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)
      
      viewStores.forEach(function (viewStore, index) {
        var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', values[0], ')'].join('')
        assert.deepEqual(viewStore[key], [values[0]], msg)
      })

      var result = cache.recordInAllBVS(key, values[1], tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中为属性(', key, ')并新添一个值等于(', values[1], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', values, ')'].join('')
        assert.deepEqual(viewStore[key], values, msg)
      })
    })

    QUnit.test("recordInCurrentBVS：在当前的backgroundViewStore中为某一属性新添一个值", function (assert) {
      var cache = self.create()
      var viewStores = cache.tabsMap[tabId].viewStores

      var key = 'someStrings'
      var values = ['Chross', 'Cache']

      var result = cache.recordInCurrentBVS(key, values[0], tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中创建属性(', key, ')并新添一个值等于(', values[0], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == viewStores.length - 1) {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', values[0], ')'].join('')
          assert.deepEqual(viewStore[key], [values[0]], msg)
        }
        else {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值不等于(', values[0], ')'].join('')
          assert.notDeepEqual(viewStore[key], [values[0]], msg)
        }
      })

      var result = cache.recordInCurrentBVS(key, values[1], tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中为属性(', key, ')并新添一个值等于(', values[1], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == viewStores.length - 1) {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', values, ')'].join('')
          assert.deepEqual(viewStore[key], values, msg)
        }
        else {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值不等于(', values, ')'].join('')
          assert.notDeepEqual(viewStore[key], values, msg)
        }
      })
    })

    QUnit.test("recordInSpecificBVS：在指定的backgroundViewStore中设置某一属性等于某一值", function (assert) {
      var cache = self.create()
      var viewStores = cache.tabsMap[tabId].viewStores

      var key = 'someObjects'
      var values = [{name: 'chross'}, {version: 1.0}]
      var specificIndex = 3
      var stringifies = [JSON.stringify(values[0]), JSON.stringify(values[1])]

      var result = cache.recordInSpecificBVS(key, values[0], specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中创建属性(', key, ')并新添一个值等于(', stringifies[0], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == specificIndex) {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', stringifies[0], ')'].join('')
          assert.deepEqual(viewStore[key], [values[0]], msg)
        }
        else {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值不等于(', stringifies[0], ')'].join('')
          assert.notDeepEqual(viewStore[key], [values[0]], msg)
        }
      })

      var result = cache.recordInSpecificBVS(key, values[1], specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中为属性(', key, ')并新添一个值等于(', stringifies[1], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == specificIndex) {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', stringifies, ')'].join('')
          assert.deepEqual(viewStore[key], values, msg)
        }
        else {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值不等于(', stringifies, ')'].join('')
          assert.notDeepEqual(viewStore[key], values, msg)
        }
      })
    })
  },

  testRecordAPIs_UVS: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test("recordInAllUVS：在全部的userViewStore中为某一属性新添一个值", function (assert) {
      var cache = self.create()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var key = 'someNumbers'
      var values = [10, 20]

      var result = cache.recordInAllUVS(key, values[0], tabId)

      var msg = ['Passed：', '在全部的userViewStore中创建属性(', key, ')并新添一个值等于(', values[0], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值等于(', values[0], ')'].join('')
        assert.deepEqual(viewStore[key], [values[0]], msg)
      })

      var result = cache.recordInAllUVS(key, values[1], tabId)

      var msg = ['Passed：', '在全部的userViewStore中为属性(', key, ')并新添一个值等于(', values[1], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值等于(', values, ')'].join('')
        assert.deepEqual(viewStore[key], values, msg)
      })
    })

    QUnit.test("recordInCurrentUVS：在当前的userViewStore中为某一属性新添一个值", function (assert) {
      var cache = self.create()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var key = 'someStrings'
      var values = ['Chross', 'Cache']

      var result = cache.recordInCurrentUVS(key, values[0], tabId)

      var msg = ['Passed：', '在当前的userViewStore中创建属性(', key, ')并新添一个值等于(', values[0], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == viewStores.length - 1) {
          var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值等于(', values[0], ')'].join('')
          assert.deepEqual(viewStore[key], [values[0]], msg)
        }
        else {
          var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值不等于(', values[0], ')'].join('')
          assert.notDeepEqual(viewStore[key], [values[0]], msg)
        }
      })

      var result = cache.recordInCurrentUVS(key, values[1], tabId)

      var msg = ['Passed：', '在当前的userViewStore中为属性(', key, ')并新添一个值等于(', values[1], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == viewStores.length - 1) {
          var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值等于(', values, ')'].join('')
          assert.deepEqual(viewStore[key], values, msg)
        }
        else {
          var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值不等于(', values, ')'].join('')
          assert.notDeepEqual(viewStore[key], values, msg)
        }
      })
    })

    QUnit.test("recordInSpecificUVS：在指定的userViewStore中设置某一属性等于某一值", function (assert) {
      var cache = self.create()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var key = 'someObjects'
      var values = [{name: 'chross'}, {version: 1.0}]
      var specificIndex = 3
      var stringifies = [JSON.stringify(values[0]), JSON.stringify(values[1])]

      var result = cache.recordInSpecificUVS(key, values[0], specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中创建属性(', key, ')并新添一个值等于(', stringifies[0], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == specificIndex) {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', stringifies[0], ')'].join('')
          assert.deepEqual(viewStore[key], [values[0]], msg)
        }
        else {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值不等于(', stringifies[0], ')'].join('')
          assert.notDeepEqual(viewStore[key], [values[0]], msg)
        }
      })

      var result = cache.recordInSpecificUVS(key, values[1], specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中为属性(', key, ')并新添一个值等于(', stringifies[1], ')'].join('')
      assert.notStrictEqual(result.data, null, msg)

      viewStores.forEach(function (viewStore, index) {
        if (index == specificIndex) {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', stringifies, ')'].join('')
          assert.deepEqual(viewStore[key], values, msg)
        }
        else {
          var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值不等于(', stringifies, ')'].join('')
          assert.notDeepEqual(viewStore[key], values, msg)
        }
      })
    })
  }
})