$.extend(Suite.prototype, {
  testFilterAPIs: function () {
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

    var patternURL = 'http://localhost/scripts/1.js'
    var pattern = new RegExp(patternURL)

    moments.forEach(function (moment) {
      expected[moment] = []
      viewStores.forEach(function (viewStore) {
        var data =
          (moment == 'onBeforeRedirect' || moment == 'onErrorOccurred') ?
          {
            key: undefined,
            value: undefined
          } :
          {
            key: moment,
            value: viewStore[moment].filter(function (value) {
              return pattern.exec(value.url) !== null
            })
          }

        expected[moment].push(data)
      })
    })

    var specificIndex = 3

    QUnit.module('filterAPIs', {
      beforeEach: function () {
        this.network = self.create()
      }
    }, function () {
      QUnit.module('All', function () {
        QUnit.module('BVS', function () {
          function eachAssert(result, assert) {
            Object.keys(result).forEach(function (moment) {
              var item = result[moment]

              var msg = ['Passed：', '在 All BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情'].join('')
              assert.strictEqual(item.length, 5, msg)

              var msg = ['Passed：', '检查在 All BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情等于', expected[moment]].join('')
              assert.deepEqual(item, expected[moment], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['filterInAllBVS：在 All BVS 中 filter all 网络时刻中匹配', patternURL, '的详情'].join(''), function (assert) {
              eachAssert(this.network.filterInAllBVS(this.network.moments, patternURL, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['filterInAllBVS：在 All BVS 中 filter 网络时刻', moment, '中匹配', patternURL, '的详情'].join(''), function (assert) {
                eachAssert(this.network.filterInAllBVS([moment], patternURL, tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['filterInAllBVS', specialMoment, '：在 All BVS 中 filter all 网络时刻中匹配', patternURL, '的详情'].join(''), function (assert) {
                eachAssert(this.network['filterInAllBVS' + specialMoment](patternURL, tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['filterInAllBVS', moment, '：在 All BVS 中 filter 网络时刻', moment, '中匹配', patternURL, '的详情'].join(''), function (assert) {
                  eachAssert(this.network['filterInAllBVS' + moment](patternURL, tabId), assert)
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

              var msg = ['Passed：', '在 Current BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情'].join('')
              assert.notStrictEqual(item, undefined, msg)

              var msg = ['Passed：', '检查在 Current BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情等于', expected[moment]].join('')
              assert.deepEqual(item, expected[moment][expected[moment].length - 1], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['filterInCurrentBVS：在 Current BVS 中 filter all 网络时刻中匹配', patternURL, '的详情'].join(''), function (assert) {
              eachAssert(this.network.filterInCurrentBVS(this.network.moments, patternURL, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['filterInCurrentBVS：在 Current BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情'].join(''), function (assert) {
                eachAssert(this.network.filterInCurrentBVS([moment], patternURL, tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['filterInCurrentBVS', specialMoment, '：在 Current BVS 中 filte all 网络时刻中匹配', patternURL, '的详情'].join(''), function (assert) {
                eachAssert(this.network['filterInCurrentBVS' + specialMoment](patternURL, tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['filterInCurrentBVS', moment, '：在 Current BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情'].join(''), function (assert) {
                  eachAssert(this.network['filterInCurrentBVS' + moment](patternURL, tabId), assert)
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

              var msg = ['Passed：', '在 All BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情'].join('')
              assert.notStrictEqual(item, undefined, msg)

              var msg = ['Passed：', '检查在 All BVS 中 filter 网络时刻', moment, '的详情等于', expected[moment]].join('')
              assert.deepEqual(item, expected[moment][specificIndex], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['filterInSpecificBVS：在 Specific BVS 中 filter all 网络时刻中匹配', patternURL, '的详情'].join(''), function (assert) {
              eachAssert(this.network.filterInSpecificBVS(this.network.moments, patternURL, specificIndex, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['filterInSpecificBVS：在 Specific BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情'].join(''), function (assert) {
                eachAssert(this.network.filterInSpecificBVS([moment], patternURL, specificIndex, tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['filterInSpecificBVS', specialMoment, '：在 Specific BVS 中 filter all 网络时刻中匹配', patternURL, '的详情'].join(''), function (assert) {
                eachAssert(this.network['filterInSpecificBVS' + specialMoment](patternURL, specificIndex, tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['filterInSpecificBVS', moment, '：在 Specific BVS 中 filter 网络时刻', moment, '匹配', patternURL, '的详情'].join(''), function (assert) {
                  eachAssert(this.network['filterInSpecificBVS' + moment](patternURL, specificIndex, tabId), assert)
                })
              })
            })
          })
        })
      })
    })
  }
})