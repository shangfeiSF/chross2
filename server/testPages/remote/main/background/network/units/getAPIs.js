$.extend(Suite.prototype, {
  testGetAPIs_core: function () {
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

    moments.forEach(function (moment) {
      expected[moment] = []
      viewStores.forEach(function (viewStore) {
        expected[moment].push({
          key: moment == 'onBeforeRedirect' || moment == 'onErrorOccurred' ? undefined : moment,
          value: viewStore[moment]
        })
      })
    })

    QUnit.test(["getInAllBVS：在全部的backgroundViewStore中获取全部网络时刻的请求详情"].join(''), function (assert) {
      var network = self.create()

      var result = network.getInAllBVS(network.moments, tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中获取全部网络时刻的请求详情'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在全部的backgroundViewStore中网络时刻', moment, '的请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment], msg)
      })
    })

    QUnit.test(["getInCurrentBVS：在当前的backgroundViewStore中获取全部网络时刻的请求详情"].join(''), function (assert) {
      var network = self.create()

      var result = network.getInCurrentBVS(network.moments, tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中获取全部网络时刻的请求详情'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在当前的backgroundViewStore中网络时刻', moment, '的请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment][expected[moment].length - 1], msg)
      })
    })

    QUnit.test(["getInSpecificBVS：在指定的backgroundViewStore中获取全部网络时刻的请求详情"].join(''), function (assert) {
      var network = self.create()

      var specificIndex = 3
      var result = network.getInSpecificBVS(network.moments, specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中获取全部网络时刻的请求详情'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在指定的backgroundViewStore[', specificIndex, ']中网络时刻', moment, '的请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment][specificIndex], msg)
      })
    })
  },

  testGetAPIs_derivative: function () {
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

    moments.forEach(function (moment) {
      expected[moment] = []
      viewStores.forEach(function (viewStore) {
        expected[moment].push({
          key: moment == 'onBeforeRedirect' || moment == 'onErrorOccurred' ? undefined : moment,
          value: viewStore[moment]
        })
      })
    })

    moments.forEach(function (moment) {
      QUnit.test(["getInAllBVS", moment, "：在全部的backgroundViewStore中获取网络时刻", moment, "的请求详情"].join(''), function (assert) {
        var network = self.create()

        var result = network['getInAllBVS' + moment](tabId)

        var msg = ['Passed：', '在全部的backgroundViewStore中获取网络时刻', moment, '的请求详情'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在全部的backgroundViewStore中网络时刻', moment, '的请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment], msg)
      })

      QUnit.test(["getInCurrentBVS", moment, "：在当前的backgroundViewStore中获取网络时刻", moment, "的请求详情"].join(''), function (assert) {
        var network = self.create()

        var result = network['getInCurrentBVS' + moment](tabId)

        var msg = ['Passed：', '在当前的backgroundViewStore中获取网络时刻', moment, '的请求详情'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在当前的backgroundViewStore中网络时刻', moment, '的请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment][expected[moment].length - 1], msg)
      })

      QUnit.test(["getInSpecificBVS", moment, "：在指定的backgroundViewStore中检查网络时刻", moment, "的请求详情"].join(''), function (assert) {
        var network = self.create()

        var specificIndex = 3
        var result = network['getInSpecificBVS' + moment](specificIndex, tabId)

        var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中获取网络时刻', moment, '的请求详情'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在指定的backgroundViewStore[', specificIndex, ']中网络时刻', moment, '的请求详情'].join('')
        assert.deepEqual(result[moment], expected[moment][specificIndex], msg)
      })
    })
  }
})