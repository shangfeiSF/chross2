$.extend(Suite.prototype, {
  testFilterAPIs_core: function () {
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

    QUnit.test(["filterInAllBVS：在全部的backgroundViewStore中获取全部网络时刻中关于", patternURL, "的请求详情"].join(''), function (assert) {
      var network = self.create()

      var result = network.filterInAllBVS(network.moments, patternURL, tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中获取全部网络时刻中关于', patternURL, '的请求详情'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在全部的backgroundViewStore中网络时刻', moment, '中关于', patternURL, '请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment], msg)
      })
    })

    QUnit.test(["filterInCurrentBVS：在当前的backgroundViewStore中获取全部网络时刻中关于", patternURL, "的请求详情"].join(''), function (assert) {
      var network = self.create()

      var result = network.filterInCurrentBVS(network.moments, patternURL, tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中获取全部网络时刻中关于', patternURL, '的请求详情'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在当前的backgroundViewStore中网络时刻', moment, '中关于', patternURL, '请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment][expected[moment].length - 1], msg)
      })
    })

    QUnit.test(["filterInSpecificBVS：在指定的backgroundViewStore中获取全部网络时刻中关于", patternURL, "的请求详情"].join(''), function (assert) {
      var network = self.create()

      var specificIndex = 3
      var result = network.filterInSpecificBVS(network.moments, patternURL, specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore中获取全部网络时刻中关于', patternURL, '的请求详情'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在指定的backgroundViewStore中网络时刻', moment, '中关于', patternURL, '请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment][specificIndex], msg)
      })
    })
  },

  testFilterAPIs_derivative: function () {
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

    moments.forEach(function (moment) {
      QUnit.test(["filterInAllBVS", moment, "：在全部的backgroundViewStore中获取网络时刻", moment, "中关于", patternURL, "的请求详情"].join(''), function (assert) {
        var network = self.create()

        var result = network['filterInAllBVS' + moment](patternURL, tabId)

        var msg = ['Passed：', '在全部的backgroundViewStore中获取网络时刻', moment, '中关于', patternURL, '的请求详情'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在全部的backgroundViewStore中网络时刻', moment, '中关于', patternURL, '请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment], msg)
      })

      QUnit.test(["filterInCurrentBVS", moment, "：在当前的backgroundViewStore中获取网络时刻", moment, "中关于", patternURL, "的请求详情"].join(''), function (assert) {
        var network = self.create()

        var result = network['filterInCurrentBVS' + moment](patternURL, tabId)

        var msg = ['Passed：', '在当前的backgroundViewStore中获取网络时刻', moment, '中关于', patternURL, '的请求详情'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在当前的backgroundViewStore中网络时刻', moment, '中关于', patternURL, '请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment][expected[moment].length - 1], msg)
      })

      QUnit.test(["filterInSpecificBVS", moment, "：在指定的backgroundViewStore中获取网络时刻", moment, "中关于", patternURL, "的请求详情"].join(''), function (assert) {
        var network = self.create()

        var specificIndex = 3
        var result = network['filterInSpecificBVS' + moment](patternURL, specificIndex, tabId)

        var msg = ['Passed：', '在指定的backgroundViewStore中获取网络时刻', moment, '中关于', patternURL, '的请求详情'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在指定的backgroundViewStore中网络时刻', moment, '中关于', patternURL, '请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment][specificIndex], msg)
      })
    })
  }
})