$.extend(Suite.prototype, {
  testRecordAPIs: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.module('recordAPIs', {
      beforeEach: function () {
        this.cache = self.create()
      }
    }, function () {
      QUnit.module('All', function () {
        QUnit.module('BVS', function () {
          QUnit.test('recordInAllBVS：在 All BVS 中 record 某属性一条记录', function (assert) {
            var cache = this.cache
            var viewStores = cache.tabsMap[tabId].viewStores

            var key = 'someNumbers'
            var values = [10, 20]

            var result = cache.recordInAllBVS(key, values[0], tabId)

            var msg = ['Passed：', '在 All BVS 中 create 属性', key, '并 reocrd 一条记录等于', values[0]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', values[0]].join('')
              assert.deepEqual(viewStore[key], [values[0]], msg)
            })

            var result = cache.recordInAllBVS(key, values[1], tabId)

            var msg = ['Passed：', '在 All BVS 中向已有属性', key, '新record 一条记录等于', values[1]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', values].join('')
              assert.deepEqual(viewStore[key], values, msg)
            })
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('recordInAllUVS：在 All UVS 中 record 某属性一条记录', function (assert) {
            var cache = this.cache
            var viewStores = cache.userTabsMap[tabId].viewStores

            var key = 'someNumbers'
            var values = [10, 20]

            var result = cache.recordInAllUVS(key, values[0], tabId)

            var msg = ['Passed：', '在 All UVS 中 create 属性', key, '并 record 一条记录等于', values[0]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '等于', values[0]].join('')
              assert.deepEqual(viewStore[key], [values[0]], msg)
            })

            var result = cache.recordInAllUVS(key, values[1], tabId)

            var msg = ['Passed：', '在 All UVS 中向已有属性', key, '新 reocord 一条记录等于', values[1]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '等于', values].join('')
              assert.deepEqual(viewStore[key], values, msg)
            })
          })
        })
      })

      QUnit.module('Current', function () {
        QUnit.module('BVS', function () {
          QUnit.test('recordInCurrentBVS：在 Current BVS 中 record 某属性一条记录', function (assert) {
            var cache = this.cache
            var viewStores = cache.tabsMap[tabId].viewStores

            var key = 'someStrings'
            var values = ['Chross', 'Cache']

            var result = cache.recordInCurrentBVS(key, values[0], tabId)

            var msg = ['Passed：', '在 Current BVS 中 create 属性', key, '并 record 一条记录等于', values[0]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == viewStores.length - 1) {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', values[0]].join('')
                assert.deepEqual(viewStore[key], [values[0]], msg)
              }
              else {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '不等于', values[0]].join('')
                assert.notDeepEqual(viewStore[key], [values[0]], msg)
              }
            })

            var result = cache.recordInCurrentBVS(key, values[1], tabId)

            var msg = ['Passed：', '在 Current BVS 中向已有属性', key, '新record一条记录等于', values[1]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == viewStores.length - 1) {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', values].join('')
                assert.deepEqual(viewStore[key], values, msg)
              }
              else {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '不等于', values].join('')
                assert.notDeepEqual(viewStore[key], values, msg)
              }
            })
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('recordInCurrentUVS：在 Current UVS 中 record 某属性一条记录', function (assert) {
            var cache = this.cache
            var viewStores = cache.userTabsMap[tabId].viewStores

            var key = 'someStrings'
            var values = ['Chross', 'Cache']

            var result = cache.recordInCurrentUVS(key, values[0], tabId)

            var msg = ['Passed：', '在 Current UVS 中 create 属性', key, '并 record 一条记录等于', values[0]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == viewStores.length - 1) {
                var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '等于', values[0]].join('')
                assert.deepEqual(viewStore[key], [values[0]], msg)
              }
              else {
                var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '不等于', values[0]].join('')
                assert.notDeepEqual(viewStore[key], [values[0]], msg)
              }
            })

            var result = cache.recordInCurrentUVS(key, values[1], tabId)

            var msg = ['Passed：', '在 Current UVS 中向已有属性', key, '新 reocrd 一条记录等于', values[1]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == viewStores.length - 1) {
                var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '等于', values].join('')
                assert.deepEqual(viewStore[key], values, msg)
              }
              else {
                var msg = ['Passed：', '检查 UVS[', index, '] 的属性', key, '不等于', values].join('')
                assert.notDeepEqual(viewStore[key], values, msg)
              }
            })
          })
        })
      })

      QUnit.module('Specific', function () {
        QUnit.module('BVS', function () {
          QUnit.test('recordInSpecificBVS：在 Specific BVS 中 record 某属性一条记录', function (assert) {
            var cache = this.cache
            var viewStores = cache.tabsMap[tabId].viewStores

            var key = 'someObjects'
            var values = [{name: 'chross'}, {version: 1.0}]
            var specificIndex = 3
            var stringifies = [JSON.stringify(values[0]), JSON.stringify(values[1])]

            var result = cache.recordInSpecificBVS(key, values[0], specificIndex, tabId)

            var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中 create 属性', key, '并 record 一条记录等于', stringifies[0]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == specificIndex) {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', stringifies[0]].join('')
                assert.deepEqual(viewStore[key], [values[0]], msg)
              }
              else {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '不等于', stringifies[0]].join('')
                assert.notDeepEqual(viewStore[key], [values[0]], msg)
              }
            })

            var result = cache.recordInSpecificBVS(key, values[1], specificIndex, tabId)

            var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中向已有属性', key, '新 record 一条记录等于', stringifies[1]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == specificIndex) {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', stringifies].join('')
                assert.deepEqual(viewStore[key], values, msg)
              }
              else {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '不等于', stringifies].join('')
                assert.notDeepEqual(viewStore[key], values, msg)
              }
            })
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('recordInSpecificUVS：在 Specific UVS 中 record 某属性一条记录', function (assert) {
            var cache = this.cache
            var viewStores = cache.userTabsMap[tabId].viewStores

            var key = 'someObjects'
            var values = [{name: 'chross'}, {version: 1.0}]
            var specificIndex = 3
            var stringifies = [JSON.stringify(values[0]), JSON.stringify(values[1])]

            var result = cache.recordInSpecificUVS(key, values[0], specificIndex, tabId)

            var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中 create 属性', key, '并 record 一条记录等于', stringifies[0]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == specificIndex) {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', stringifies[0]].join('')
                assert.deepEqual(viewStore[key], [values[0]], msg)
              }
              else {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '不等于', stringifies[0]].join('')
                assert.notDeepEqual(viewStore[key], [values[0]], msg)
              }
            })

            var result = cache.recordInSpecificUVS(key, values[1], specificIndex, tabId)

            var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中向已有属性', key, '新 record 一条记录等于', stringifies[1]].join('')
            assert.notStrictEqual(result.data, null, msg)

            viewStores.forEach(function (viewStore, index) {
              if (index == specificIndex) {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '等于', stringifies].join('')
                assert.deepEqual(viewStore[key], values, msg)
              }
              else {
                var msg = ['Passed：', '检查 BVS[', index, '] 的属性', key, '不等于', stringifies].join('')
                assert.notDeepEqual(viewStore[key], values, msg)
              }
            })
          })
        })
      })
    })
  }
})