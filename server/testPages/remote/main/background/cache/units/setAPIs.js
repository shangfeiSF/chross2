$.extend(Suite.prototype, {
  testSetAPIs: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.module('setAPIs', {
      beforeEach: function () {
        this.cache = self.create()
      }
    }, function () {
      QUnit.module('All', function () {
        QUnit.module('BVS', function () {
          QUnit.test('setInAllBVS：在 All BVS 中 set 某属性等于某值', function (assert) {
            var cache = this.cache
            var viewStores = cache.tabsMap[tabId].viewStores

            var key = 'aNumber'
            var value = 10

            var result = cache.setInAllBVS(key, value, tabId)

            var msg = ['Passed：', '在 All BVS 中 set 属性', key, '等于', value].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', value].join('')
              assert.deepEqual(viewStore[key], value, msg)
            })
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('setInAllUVS：在 All UVS 中 set 某属性等于某值', function (assert) {
            var cache = this.cache
            var viewStores = cache.userTabsMap[tabId].viewStores

            var key = 'aNumber'
            var value = 10

            var result = cache.setInAllUVS(key, value, tabId)

            var msg = ['Passed：', '在 All UVS 中 set 属性', key, '等于', value].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '等于', value].join('')
              assert.deepEqual(viewStore[key], value, msg)
            })
          })
        })
      })

      QUnit.module('Current', function () {
        QUnit.module('BVS', function () {
          QUnit.test('setInCurrentBVS：在 Current BVS 中 set 某属性等于某值', function (assert) {
            var cache = this.cache
            var viewStores = cache.tabsMap[tabId].viewStores

            var key = 'aString'
            var value = 'Chross'

            var result = cache.setInCurrentBVS(key, value, tabId)

            var msg = ['Passed：', '在 Current BVS 中 set 属性', key, '等于', value].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == viewStores.length - 1) {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', value].join('')
                assert.deepEqual(viewStore[key], value, msg)
              }
              else {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '不等于', value].join('')
                assert.notDeepEqual(viewStore[key], value, msg)
              }
            })
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('setInCurrentUVS：在 Current UVS 中 set 某属性等于某值', function (assert) {
            var cache = this.cache
            var viewStores = cache.userTabsMap[tabId].viewStores

            var key = 'aString'
            var value = 'Chross'

            var result = cache.setInCurrentUVS(key, value, tabId)

            var msg = ['Passed：', '在 Current UVS 中 set 属性', key, '等于', value].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == viewStores.length - 1) {
                var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '等于', value].join('')
                assert.deepEqual(viewStore[key], value, msg)
              }
              else {
                var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '不等于', value].join('')
                assert.notDeepEqual(viewStore[key], value, msg)
              }
            })
          })
        })
      })

      QUnit.module('Specific', function () {
        QUnit.module('BVS', function () {
          QUnit.test('setInSpecificBVS：在 Specific BVS 中 set 某属性等于某值', function (assert) {
            var cache = this.cache
            var viewStores = cache.tabsMap[tabId].viewStores

            var key = 'anArray'
            var value = [10, 'Chross']
            var specificIndex = 3

            var result = cache.setInSpecificBVS(key, value, specificIndex, tabId)

            var msg = ['Passed：', '在 Specific BVS[', specificIndex, ']中 set 属性', key, '等于', value].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == specificIndex) {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', value].join('')
                assert.deepEqual(viewStore[key], value, msg)
              }
              else {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '不等于', value].join('')
                assert.notDeepEqual(viewStore[key], value, msg)
              }
            })
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('setInSpecificUVS：在 Specific UVS 中 set 某属性等于某值', function (assert) {
            var cache = this.cache
            var viewStores = cache.userTabsMap[tabId].viewStores

            var key = 'anArray'
            var value = [10, 'Chross']
            var specificIndex = 3

            var result = cache.setInSpecificUVS(key, value, specificIndex, tabId)

            var msg = ['Passed：', '在 Specific UVS[', specificIndex, '] 中 set 属性', key, '等于', value].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == specificIndex) {
                var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '等于', value].join('')
                assert.deepEqual(viewStore[key], value, msg)
              }
              else {
                var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '不等于', value].join('')
                assert.notDeepEqual(viewStore[key], value, msg)
              }
            })
          })
        })
      })
    })
  }
})