$.extend(Suite.prototype, {
  testGetAPIs: function () {
    var self = this
    var tabId = self.config.mockData.tabId
    var viewStores = self.config.mockData.tabStore.viewStores

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

    moments.forEach(function (moment) {
      expected[moment] = []
      viewStores.forEach(function (viewStore) {
        expected[moment].push({
          key: moment == 'onBeforeRedirect' || moment == 'onErrorOccurred' ? undefined : moment,
          value: viewStore[moment]
        })
      })
    })

    var specificIndex = 3

    QUnit.module('getAPIs', {
      beforeEach: function () {
        this.network = self.create()
      }
    }, function () {
      QUnit.module('All', function () {
        QUnit.module('BVS', function () {
          function eachAssert(result, assert) {
            Object.keys(result).forEach(function (moment) {
              var item = result[moment]

              var msg = ['Passed：', '在 All BVS 中 get 网络时刻', moment, '的详情'].join('')
              assert.strictEqual(item.length, 5, msg)

              var msg = ['Passed：', '检查在 All BVS 中 get 网络时刻', moment, '的详情等于', expected[moment]].join('')
              assert.deepEqual(item, expected[moment], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['getInAllBVS：在 All BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
              eachAssert(this.network.getInAllBVS(this.network.moments, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['getInAllBVS：在 All BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
                eachAssert(this.network.getInAllBVS([moment], tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['getInAllBVS', specialMoment, '：在 All BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
                eachAssert(this.network['getInAllBVS' + specialMoment](tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['getInAllBVS', moment, '：在 All BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
                  eachAssert(this.network['getInAllBVS' + moment](tabId), assert)
                })
              })
            })
          })
        })
      })

      QUnit.module('Current', function () {
        QUnit.module('BVS', function () {
          function eachAssert(result, assert) {
            Object.keys(result).forEach(function (moment) {
              var item = result[moment]

              var msg = ['Passed：', '在 Current BVS 中 get 网络时刻', moment, '的详情'].join('')
              assert.notStrictEqual(item, undefined, msg)

              var msg = ['Passed：', '检查在 Current BVS 中 get 网络时刻', moment, '的详情等于', expected[moment][expected[moment].length - 1]].join('')
              assert.deepEqual(item, expected[moment][expected[moment].length - 1], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['getInCurrentBVS：在 Current BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
              eachAssert(this.network.getInCurrentBVS(this.network.moments, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['getInCurrentBVS：在 Current BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
                eachAssert(this.network.getInCurrentBVS([moment], tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['getInCurrentBVS', specialMoment, '：在 Current BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
                eachAssert(this.network['getInCurrentBVS' + specialMoment](tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['getInCurrentBVS', moment, '：在 Current BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
                  eachAssert(this.network['getInCurrentBVS' + moment](tabId), assert)
                })
              })
            })
          })
        })
      })

      QUnit.module('Specific', function () {
        QUnit.module('BVS', function () {
          function eachAssert(result, assert) {
            Object.keys(result).forEach(function (moment) {
              var item = result[moment]

              var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中 get 网络时刻', moment, '的详情'].join('')
              assert.notStrictEqual(item, undefined, msg)

              var msg = ['Passed：', '检查在 Specific BVS[', specificIndex, '] 中 get 网络时刻', moment, '的详情等于', expected[moment][specificIndex]].join('')
              assert.deepEqual(item, expected[moment][specificIndex], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['getInSpecificBVS：在 Specific BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
              eachAssert(this.network.getInSpecificBVS(this.network.moments, specificIndex, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['getInSpecificBVS：在 Specific BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
                eachAssert(this.network.getInSpecificBVS([moment], specificIndex, tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['getInSpecificBVS', specialMoment, '：在 Specific BVS 中 get all 网络时刻的详情'].join(''), function (assert) {
                eachAssert(this.network['getInSpecificBVS' + specialMoment](specificIndex, tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['getInSpecificBVS', moment, '：在 Specific BVS 中 get 网络时刻', moment, '的详情'].join(''), function (assert) {
                  eachAssert(this.network['getInSpecificBVS' + moment](specificIndex, tabId), assert)
                })
              })
            })
          })
        })
      })
    })
  }
})