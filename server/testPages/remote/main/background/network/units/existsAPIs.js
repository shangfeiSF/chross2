$.extend(Suite.prototype, {
  testExistsAPIs: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    var moments = [
      'onBeforeRequest',
      'onBeforeSendHeaders',
      'onSendHeaders',
      'onHeadersReceived',
      'onBeforeRedirect',
      'onResponseStarted',
      'onCompleted',
      'onErrorOccurred'
    ]
    var specialMoment = 'onAllMoments'

    var expectedInAllViewStores = {
      onBeforeRequest: [true, true, true, true, true],
      onBeforeSendHeaders: [true, true, true, true, true],
      onSendHeaders: [true, true, true, true, true],
      onHeadersReceived: [true, true, true, true, true],
      onBeforeRedirect: [false, false, false, false, false],
      onResponseStarted: [true, true, true, true, true],
      onCompleted: [true, true, true, true, true],
      onErrorOccurred: [false, false, false, false, false]
    }
    var expectedInOneViewStore = {
      onBeforeRequest: true,
      onBeforeSendHeaders: true,
      onSendHeaders: true,
      onHeadersReceived: true,
      onBeforeRedirect: false,
      onResponseStarted: true,
      onCompleted: true,
      onErrorOccurred: false
    }

    var specificIndex = 3

    QUnit.module('existsAPIs', {
      beforeEach: function () {
        this.network = self.create()
      }
    }, function () {
      QUnit.module('All', function () {
        QUnit.module('BVS', function () {
          function eachAssert(result, assert) {
            Object.keys(result).forEach(function (moment) {
              var item = result[moment]

              var msg = ['Passed：', '在 All BVS 中检查网络时刻', moment, '的存在性'].join('')
              assert.notStrictEqual(item, null, msg)

              var msg = ['Passed：', '检查在 All BVS 中网络时刻', moment, '的存在性分布', expectedInAllViewStores[moment]].join('')
              assert.deepEqual(item.data, expectedInAllViewStores[moment], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['existsInAllBVS：在 All BVS 中检查 all 网络时刻的存在性'].join(''), function (assert) {
              eachAssert(this.network.existsInAllBVS(this.network.moments, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['existsInAllBVS：在 All BVS 中检查网络时刻', moment, '的存在性'].join(''), function (assert) {
                eachAssert(this.network.existsInAllBVS([moment], tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['existsInAllBVS', specialMoment, '：在 All BVS 中检查 all 网络时刻的存在性'].join(''), function (assert) {
                eachAssert(this.network['existsInAllBVS' + specialMoment](tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['existsInAllBVS', moment, '：在 All BVS 中检查网络时刻', moment, '的存在性'].join(''), function (assert) {
                  eachAssert(this.network['existsInAllBVS' + moment](tabId), assert)
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

              var msg = ['Passed：', '在 Current BVS 中检查网络时刻', moment, '的存在性'].join('')
              assert.notStrictEqual(item, null, msg)

              var msg = ['Passed：', '检查在 Current BVS 中网络时刻', moment, expectedInOneViewStore[moment] ? '存在' : '不存在'].join('')
              assert.deepEqual(item.data, expectedInOneViewStore[moment], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['existsInCurrentBVS：在 Current BVS 中检查 all 网络时刻的存在性'].join(''), function (assert) {
              eachAssert(this.network.existsInCurrentBVS(this.network.moments, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['existsInCurrentBVS：在 Current BVS 中检查网络时刻', moment, '的存在性'].join(''), function (assert) {
                eachAssert(this.network.existsInCurrentBVS([moment], tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['existsInCurrentBVS', specialMoment, '：在 Current BVS 中检查 all 网络时刻的存在性'].join(''), function (assert) {
                eachAssert(this.network['existsInCurrentBVS' + specialMoment](tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['existsInCurrentBVS', moment, '：在 Current BVS 中检查网络时刻', moment, '的存在性'].join(''), function (assert) {
                  eachAssert(this.network['existsInCurrentBVS' + moment](tabId), assert)
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

              var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中检查网络时刻', moment, '的存在性'].join('')
              assert.notStrictEqual(item, null, msg)

              var msg = ['Passed：', '检查在 Specific BVS[', specificIndex, '] 中网络时刻', moment, expectedInOneViewStore[moment] ? '存在' : '不存在'].join('')
              assert.deepEqual(item.data, expectedInOneViewStore[moment], msg)
            })
          }

          QUnit.module('Core', function () {
            QUnit.test(['existsInSpecificBVS：在 Specific BVS 中检查 all 网络时刻的存在性'].join(''), function (assert) {
              eachAssert(this.network.existsInSpecificBVS(this.network.moments, specificIndex, tabId), assert)
            })

            moments.forEach(function (moment) {
              QUnit.test(['existsInSpecificBVS：在 Specific BVS 中检查网络时刻', moment, '的存在性'].join(''), function (assert) {
                eachAssert(this.network.existsInSpecificBVS([moment], specificIndex, tabId), assert)
              })
            })
          })

          QUnit.module('Derivative', function () {
            QUnit.module(specialMoment, function () {
              QUnit.test(['existsInSpecificBVS', specialMoment, '：在 Specific BVS 中检查 all 网络时刻的存在性'].join(''), function (assert) {
                eachAssert(this.network['existsInSpecificBVS' + specialMoment](specificIndex, tabId), assert)
              })
            })

            moments.forEach(function (moment) {
              QUnit.module(moment, function () {
                QUnit.test(['existsInSpecificBVS：在 Specific BVS 中检查网络时刻', moment, '的存在性'].join(''), function (assert) {
                  eachAssert(this.network['existsInSpecificBVS' + moment](specificIndex, tabId), assert)
                })
              })
            })
          })
        })
      })
    })
  }
})