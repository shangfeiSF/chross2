$.extend(Suite.prototype, {
  testGetAPIs_BVS: function (cache, reset) {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test("getInAllBVS：在全部的backgroundViewStore中获取某一属性的值", function (assert) {
      var key = 'protocol'
      var expected = {
        key: "protocol",
        value: "http"
      }
      var stringify = JSON.stringify(expected)

      var result = cache.getInAllBVS(key, tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      result.data.forEach(function (value, index) {
        var msg = ['Passed：', '检查backgroundViewStore[', index, ']中属性(', key, ')的值等于(', stringify, ')'].join('')
        assert.deepEqual(value, expected, msg)
      })

      var key = 'nuknow'
      var expected = {
        key: undefined,
        value: undefined
      }

      var result = cache.getInAllBVS(key, tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      result.data.forEach(function (value, index) {
        var msg = ['Passed：', '检查backgroundViewStore[', index, ']中不存在属性(', key, ')'].join('')
        assert.deepEqual(value, expected, msg)
      })
    })

    QUnit.test("getInCurrentBVS：在当前的backgroundViewStore中获取某一属性的值", function (assert) {
      var key = 'frameIds'
      var expected = {
        key: "frameIds",
        value: [0, 11, 12]
      }
      var stringify = JSON.stringify(expected)

      var result = cache.getInCurrentBVS(key, tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查当前的backgroundViewStore中属性(', key, ')的值等于(', stringify, ')'].join('')
      assert.deepEqual(result.data, expected, msg)

      var key = 'nuknow'
      var expected = {
        key: undefined,
        value: undefined
      }

      var result = cache.getInCurrentBVS(key, tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在当前的backgroundViewStore中不存在属性(', key, ')'].join('')
      assert.deepEqual(result.data, expected, msg)
    })

    QUnit.test("getInSpecificBVS：在指定的backgroundViewStore中获取某一属性的值", function (assert) {
      var key = 'onBeforeRequest'
      var specificIndex = 3
      var expected = {
        key: key,
        value: self.config.mockData.tabStore.viewStores[specificIndex][key]
      }

      var result = cache.getInSpecificBVS(key, specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查指定的backgroundViewStore[', specificIndex, ']中属性(', key, ')的值等于(', expected, ')'].join('')
      assert.deepEqual(result.data, expected, msg)

      var key = 'nuknow'
      var expected = {
        key: undefined,
        value: undefined
      }

      var result = cache.getInSpecificBVS(key, specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中不存在属性(', key, ')'].join('')
      assert.deepEqual(result.data, expected, msg)
    })

    reset && reset()
  },

  testGetAPIs_UVS: function (cache, reset) {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test("getInAllUVS：在全部的userViewStore中获取某一属性的值", function (assert) {
      var key = 'userName'
      var expected = [{
        key: "userName",
        value: "shangfei"
      }, {
        key: "userName",
        value: "xiaoshao"
      }, {
        key: undefined,
        value: undefined
      }, {
        key: 'userName',
        value: ''
      }, {
        key: undefined,
        value: undefined
      }]

      var result = cache.getInAllUVS(key, tabId)

      var msg = ['Passed：', '在全部的userViewStore中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      result.data.forEach(function (value, index) {
        var msg = ['Passed：', '检查userViewStore[', index, ']中属性(', key, ')的值等于(', expected[index], ')'].join('')
        assert.deepEqual(value, expected[index], msg)
      })

      var key = 'nuknow'
      var expected = [{
        key: undefined,
        value: undefined
      }, {
        key: undefined,
        value: undefined
      }, {
        key: undefined,
        value: undefined
      }, {
        key: undefined,
        value: undefined
      }, {
        key: undefined,
        value: undefined
      }]

      var result = cache.getInAllUVS(key, tabId)

      var msg = ['Passed：', '在全部的userViewStore中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      result.data.forEach(function (value, index) {
        var msg = ['Passed：', '检查userViewStore[', index, ']中不存在属性(', key, ')'].join('')
        assert.deepEqual(value, expected[index], msg)
      })
    })

    QUnit.test("getInCurrentUVS：在当前的userViewStore中获取某一属性的值", function (assert) {
      var key = 'userInfo'
      var expected = {
        key: "userInfo",
        value: {
          tel: '18612697399'
        }
      }
      var stringify = JSON.stringify(expected)

      var result = cache.getInCurrentUVS(key, tabId)

      var msg = ['Passed：', '在当前的userViewStore中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查当前的userViewStore中属性(', key, ')的值等于(', stringify, ')'].join('')
      assert.deepEqual(result.data, expected, msg)

      var key = 'nuknow'
      var expected = {
        key: undefined,
        value: undefined
      }

      var result = cache.getInCurrentUVS(key, tabId)

      var msg = ['Passed：', '在当前的userViewStore中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在当前的userViewStore中不存在属性(', key, ')'].join('')
      assert.deepEqual(result.data, expected, msg)
    })

    QUnit.test("getInSpecificUVS：在指定的userViewStore中获取某一属性的值", function (assert) {
      var key = 'userId'
      var specificIndex = 3
      var expected = {
        key: 'userId',
        value: null
      }
      var stringify = JSON.stringify(expected)

      var result = cache.getInSpecificUVS(key, specificIndex, tabId)

      var msg = ['Passed：', '在指定的userViewStore[', specificIndex, ']中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查指定的userViewStore[', specificIndex, ']中属性(', key, ')的值等于(', stringify, ')'].join('')
      assert.deepEqual(result.data, expected, msg)

      var key = 'nuknow'
      var expected = {
        key: undefined,
        value: undefined
      }

      var result = cache.getInSpecificUVS(key, specificIndex, tabId)

      var msg = ['Passed：', '在指定的userViewStore[', specificIndex, ']中获取属性(', key, ')的值'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '在指定的userViewStore[', specificIndex, ']中不存在属性(', key, ')'].join('')
      assert.deepEqual(result.data, expected, msg)
    })

    reset && reset()
  }
})