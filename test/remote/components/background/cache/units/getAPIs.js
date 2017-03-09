$.extend(Suite.prototype, {
  testGetAPIs: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.module('getAPIs', {
      beforeEach: function () {
        this.cache = self.create()
      }
    }, function () {
      QUnit.module('All', function () {
        QUnit.module('BVS', function () {
          QUnit.test('getInAllBVS：在 Current BVS 中 get 某属性的值', function (assert) {
            var cache = this.cache

            var key = 'protocol'
            var expected = {
              key: 'protocol',
              value: 'http'
            }
            var stringify = JSON.stringify(expected)

            var result = cache.getInAllBVS(key, tabId)

            var msg = ['Passed：', '在 Current BVS 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            result.data.forEach(function (value, index) {
              var msg = ['Passed：', '检查 BVS[', index, '] 中属性', key, '等于', stringify].join('')
              assert.deepEqual(value, expected, msg)
            })

            var key = 'unknow'
            var expected = {
              key: undefined,
              value: undefined
            }

            var result = cache.getInAllBVS(key, tabId)

            var msg = ['Passed：', '在 Current BVS 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            result.data.forEach(function (value, index) {
              var msg = ['Passed：', '检查 BVS[', index, '] 中不存在属性', key].join('')
              assert.deepEqual(value, expected, msg)
            })
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('getInAllUVS：在 Current UVS 中 get 某属性的值', function (assert) {
            var cache = this.cache

            var key = 'userName'
            var expected = [{
              key: 'userName',
              value: 'shangfei'
            }, {
              key: 'userName',
              value: 'xiaoshao'
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

            var msg = ['Passed：', '在 Current UVS 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            result.data.forEach(function (value, index) {
              var msg = ['Passed：', '检查 UVS[', index, '] 中属性', key, '等于', expected[index]].join('')
              assert.deepEqual(value, expected[index], msg)
            })

            var key = 'unknow'
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

            var msg = ['Passed：', '在 Current UVS 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            result.data.forEach(function (value, index) {
              var msg = ['Passed：', '检查 UVS[', index, '] 中不存在属性', key].join('')
              assert.deepEqual(value, expected[index], msg)
            })
          })
        })
      })

      QUnit.module('Current', function () {
        QUnit.module('BVS', function () {
          QUnit.test('getInCurrentBVS：在 Current BVS 中 get 某属性的值', function (assert) {
            var cache = this.cache

            var key = 'frameIds'
            var expected = {
              key: 'frameIds',
              value: [0, 11, 12]
            }
            var stringify = JSON.stringify(expected)

            var result = cache.getInCurrentBVS(key, tabId)

            var msg = ['Passed：', '在 Current BVS 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Current BVS 中属性', key, '等于', stringify].join('')
            assert.deepEqual(result.data, expected, msg)

            var key = 'unknow'
            var expected = {
              key: undefined,
              value: undefined
            }

            var result = cache.getInCurrentBVS(key, tabId)

            var msg = ['Passed：', '在 Current BVS 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Current BVS 中不存在属性', key].join('')
            assert.deepEqual(result.data, expected, msg)
          })

        })

        QUnit.module('UVS', function () {
          QUnit.test('getInCurrentUVS：在 Current UVS 中 get 某属性的值', function (assert) {
            var cache = this.cache

            var key = 'userInfo'
            var expected = {
              key: 'userInfo',
              value: {
                tel: '18612697399'
              }
            }
            var stringify = JSON.stringify(expected)

            var result = cache.getInCurrentUVS(key, tabId)

            var msg = ['Passed：', '在 Current UVS 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Current UVS 中属性', key, '等于', stringify].join('')
            assert.deepEqual(result.data, expected, msg)

            var key = 'unknow'
            var expected = {
              key: undefined,
              value: undefined
            }

            var result = cache.getInCurrentUVS(key, tabId)

            var msg = ['Passed：', '在 Current UVS 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Current UVS 中不存在属性', key].join('')
            assert.deepEqual(result.data, expected, msg)
          })
        })
      })

      QUnit.module('Specific', function () {
        QUnit.module('BVS', function () {
          QUnit.test('getInSpecificBVS：在 Specific BVS 中 get 某属性的值', function (assert) {
            var cache = this.cache

            var key = 'onBeforeRequest'
            var specificIndex = 3
            var expected = {
              key: key,
              value: self.config.mockData.tabStore.viewStores[specificIndex][key]
            }

            var result = cache.getInSpecificBVS(key, specificIndex, tabId)

            var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Specific BVS[', specificIndex, '] 中属性', key, '等于', expected].join('')
            assert.deepEqual(result.data, expected, msg)

            var key = 'unknow'
            var expected = {
              key: undefined,
              value: undefined
            }

            var result = cache.getInSpecificBVS(key, specificIndex, tabId)

            var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Specific BVS[', specificIndex, '] 中不存在属性', key].join('')
            assert.deepEqual(result.data, expected, msg)
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('getInSpecificUVS：在 Specific UVS 中 get 某属性的值', function (assert) {
            var cache = this.cache

            var key = 'userId'
            var specificIndex = 3
            var expected = {
              key: 'userId',
              value: null
            }
            var stringify = JSON.stringify(expected)

            var result = cache.getInSpecificUVS(key, specificIndex, tabId)

            var msg = ['Passed：', '在 Specific UVS[', specificIndex, '] 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Specific UVS[', specificIndex, '] 中属性', key, '等于(', stringify, ')'].join('')
            assert.deepEqual(result.data, expected, msg)

            var key = 'unknow'
            var expected = {
              key: undefined,
              value: undefined
            }

            var result = cache.getInSpecificUVS(key, specificIndex, tabId)

            var msg = ['Passed：', '在 Specific UVS[', specificIndex, '] 中 get 属性', key, '的值'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Specific UVS[', specificIndex, '] 中不存在属性', key].join('')
            assert.deepEqual(result.data, expected, msg)
          })
        })
      })
    })
  }
})