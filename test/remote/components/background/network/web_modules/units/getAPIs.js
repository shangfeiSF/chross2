var suit = null
var expected = {}

var moments = [
  "onBeforeRequest",
  "onBeforeSendHeaders",
  "onSendHeaders",
  "onHeadersReceived",
  "onBeforeRedirect",
  "onResponseStarted",
  "onCompleted",
  "onErrorOccurred"
]
var specialMoment = 'onAllMoments'

var specificIndex = 3

var All = function () {
  QUnit.module('BVS', function () {
    function eachAssert(result, assert) {
      Object.keys(result).forEach(function (moment) {
        var item = result[moment]

        var msg = ['Passed：', '在 All BVS 中 get 网络时刻', moment, '的详情'].join('')
        assert.strictEqual(item.data.length, 5, msg)

        var msg = ['Passed：', '检查在 All BVS 中 get 网络时刻', moment, '的详情等于', expected[moment]].join('')
        assert.deepEqual(item.data, expected[moment], msg)
      })
    }

    QUnit.module('Core', function () {
      QUnit.test(['getInAllBVS：在 All BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
        var tabId = suit.mock.tabId
        var network = suit.beforeHook()

        eachAssert(network.getInAllBVS(network.moments, tabId), assert)
      })

      moments.forEach(function (moment) {
        QUnit.test(['getInAllBVS：在 All BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
          var tabId = suit.mock.tabId
          var network = suit.beforeHook()

          eachAssert(network.getInAllBVS([moment], tabId), assert)
        })
      })
    })

    QUnit.module('Derivative', function () {
      QUnit.module(specialMoment, function () {
        QUnit.test(['getInAllBVS', specialMoment, '：在 All BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
          var tabId = suit.mock.tabId
          var network = suit.beforeHook()

          eachAssert(network['getInAllBVS' + specialMoment](tabId), assert)
        })
      })

      moments.forEach(function (moment) {
        QUnit.module(moment, function () {
          QUnit.test(['getInAllBVS', moment, '：在 All BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
            var tabId = suit.mock.tabId
            var network = suit.beforeHook()

            eachAssert(network['getInAllBVS' + moment](tabId), assert)
          })
        })
      })
    })
  })
}

var Current = function () {
  QUnit.module('BVS', function () {
    function eachAssert(result, assert) {
      Object.keys(result).forEach(function (moment) {
        var item = result[moment]

        var msg = ['Passed：', '在 Current BVS 中 get 网络时刻', moment, '的详情'].join('')
        assert.notStrictEqual(item.data, undefined, msg)

        var msg = ['Passed：', '检查在 Current BVS 中 get 网络时刻', moment, '的详情等于', expected[moment][expected[moment].length - 1]].join('')
        assert.deepEqual(item.data, expected[moment][expected[moment].length - 1], msg)
      })
    }

    QUnit.module('Core', function () {
      QUnit.test(['getInCurrentBVS：在 Current BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
        var tabId = suit.mock.tabId
        var network = suit.beforeHook()

        eachAssert(network.getInCurrentBVS(network.moments, tabId), assert)
      })

      moments.forEach(function (moment) {
        QUnit.test(['getInCurrentBVS：在 Current BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
          var tabId = suit.mock.tabId
          var network = suit.beforeHook()

          eachAssert(network.getInCurrentBVS([moment], tabId), assert)
        })
      })
    })

    QUnit.module('Derivative', function () {
      QUnit.module(specialMoment, function () {
        QUnit.test(['getInCurrentBVS', specialMoment, '：在 Current BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
          var tabId = suit.mock.tabId
          var network = suit.beforeHook()

          eachAssert(network['getInCurrentBVS' + specialMoment](tabId), assert)
        })
      })

      moments.forEach(function (moment) {
        QUnit.module(moment, function () {
          QUnit.test(['getInCurrentBVS', moment, '：在 Current BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
            var tabId = suit.mock.tabId
            var network = suit.beforeHook()

            eachAssert(network['getInCurrentBVS' + moment](tabId), assert)
          })
        })
      })
    })
  })
}

var Specific = function () {
  QUnit.module('BVS', function () {
    function eachAssert(result, assert) {
      Object.keys(result).forEach(function (moment) {
        var item = result[moment]

        var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中 get 网络时刻', moment, '的详情'].join('')
        assert.notStrictEqual(item.data, undefined, msg)

        var msg = ['Passed：', '检查在 Specific BVS[', specificIndex, '] 中 get 网络时刻', moment, '的详情等于', expected[moment][specificIndex]].join('')
        assert.deepEqual(item.data, expected[moment][specificIndex], msg)
      })
    }

    QUnit.module('Core', function () {
      QUnit.test(['getInSpecificBVS：在 Specific BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
        var tabId = suit.mock.tabId
        var network = suit.beforeHook()

        eachAssert(network.getInSpecificBVS(network.moments, specificIndex, tabId), assert)
      })

      moments.forEach(function (moment) {
        QUnit.test(['getInSpecificBVS：在 Specific BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
          var tabId = suit.mock.tabId
          var network = suit.beforeHook()

          eachAssert(network.getInSpecificBVS([moment], specificIndex, tabId), assert)
        })
      })
    })

    QUnit.module('Derivative', function () {
      QUnit.module(specialMoment, function () {
        QUnit.test(['getInSpecificBVS', specialMoment, '：在 Specific BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
          var tabId = suit.mock.tabId
          var network = suit.beforeHook()

          eachAssert(network['getInSpecificBVS' + specialMoment](specificIndex, tabId), assert)
        })
      })

      moments.forEach(function (moment) {
        QUnit.module(moment, function () {
          QUnit.test(['getInSpecificBVS', moment, '：在 Specific BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
            var tabId = suit.mock.tabId
            var network = suit.beforeHook()

            eachAssert(network['getInSpecificBVS' + moment](specificIndex, tabId), assert)
          })
        })
      })
    })
  })
}

module.exports = function () {
  suit = this

  var viewStores = this.mock.tabStore.viewStores

  moments.forEach(function (moment) {
    expected[moment] = []

    viewStores.forEach(function (viewStore) {
      expected[moment].push({
        key: moment == 'onBeforeRedirect' || moment == 'onErrorOccurred' ? undefined : moment,
        value: viewStore[moment]
      })
    })
  })

  QUnit.module('getAPIs', function () {
    QUnit.module('All', All)
    QUnit.module('Current', Current)
    QUnit.module('Specific', Specific)
  })
}