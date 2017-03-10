var suit = null

var All = function () {
  QUnit.module('BVS', function () {
    QUnit.test('getAllBVS：get All BVS', function (assert) {
      var tabId = suit.mock.tabId
      var cache = suit.beforeHook()
      var viewStores = cache.tabsMap[tabId].viewStores

      var result = cache.getAllBVS(tabId)

      var msg = ['Passed：', 'get All BVS'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查 All BVS'].join('')
      assert.deepEqual(result.data, viewStores, msg)
    })
  })

  QUnit.module('UVS', function () {
    QUnit.test('getAllUVS：get All UVS', function (assert) {
      var tabId = suit.mock.tabId
      var cache = suit.beforeHook()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var result = cache.getAllUVS(tabId)

      var msg = ['Passed：', 'get All UVS'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查 All UVS'].join('')
      assert.deepEqual(result.data, viewStores, msg)
    })
  })
}

var Current = function () {
  QUnit.module('BVS', function () {
    QUnit.test('getCurrentBVS：get Current BVS', function (assert) {
      var tabId = suit.mock.tabId
      var cache = suit.beforeHook()
      var viewStores = cache.tabsMap[tabId].viewStores

      var result = cache.getCurrentBVS(tabId)

      var msg = ['Passed：', 'get Current BVS'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查 Current BVS'].join('')
      assert.deepEqual(result.data, viewStores[viewStores.length - 1], msg)
    })
  })

  QUnit.module('UVS', function () {
    QUnit.test('getCurrentUVS：get All UVS', function (assert) {
      var tabId = suit.mock.tabId
      var cache = suit.beforeHook()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var result = cache.getCurrentUVS(tabId)

      var msg = ['Passed：', 'get All UVS'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查 All UVS'].join('')
      assert.deepEqual(result.data, viewStores[viewStores.length - 1], msg)
    })
  })
}

var Specific = function () {
  QUnit.module('BVS', function () {
    QUnit.test('getSpecificBVS：get Specific BVS', function (assert) {
      var tabId = suit.mock.tabId
      var cache = suit.beforeHook()
      var viewStores = cache.tabsMap[tabId].viewStores

      var specificIndex = 3
      var result = cache.getSpecificBVS(specificIndex, tabId)

      var msg = ['Passed：', 'get Specific BVS[', specificIndex, ']'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查 Specific BVS[', specificIndex, ']'].join('')
      assert.deepEqual(result.data, viewStores[specificIndex], msg)
    })
  })

  QUnit.module('UVS', function () {
    QUnit.test('getSpecificUVS：get Specific UVS', function (assert) {
      var tabId = suit.mock.tabId
      var cache = suit.beforeHook()
      var viewStores = cache.userTabsMap[tabId].viewStores

      var specificIndex = 3
      var result = cache.getSpecificUVS(specificIndex, tabId)

      var msg = ['Passed：', 'get Specific UVS[', specificIndex, ']'].join('')
      assert.notStrictEqual(result.data, null, msg)

      var msg = ['Passed：', '检查 Specific UVS[', specificIndex, ']'].join('')
      assert.deepEqual(result.data, viewStores[specificIndex], msg)
    })
  })
}

module.exports = function () {
  suit = this

  QUnit.module('getViewAPIs', function () {
    QUnit.module('All', All)
    QUnit.module('Current', Current)
    QUnit.module('Specific', Specific)
  })
}