$.extend(Suite.prototype, {
  testExistsAPIs_core: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test(["existsInAllBVS：在全部的backgroundViewStore中检查全部网络时刻是否存在"].join(''), function (assert) {
      var network = self.create()

      var expected = {
        onBeforeRequest: [true, true, true, true, true],
        onBeforeSendHeaders: [true, true, true, true, true],
        onSendHeaders: [true, true, true, true, true],
        onHeadersReceived: [true, true, true, true, true],
        onBeforeRedirect: [false, false, false, false, false],
        onResponseStarted: [true, true, true, true, true],
        onCompleted: [true, true, true, true, true],
        onErrorOccurred: [false, false, false, false, false]
      }

      var result = network.existsInAllBVS(network.moments, tabId)

      var msg = ['Passed：', '在全部的backgroundViewStore中检查全部网络时刻是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在全部的backgroundViewStore中网络时刻', moment, '的存在分布为', expected[moment]].join('')
        assert.deepEqual(result[moment], expected[moment], msg)
      })
    })

    QUnit.test(["existsInCurrentBVS：在当前的backgroundViewStore中检查全部网络时刻是否存在"].join(''), function (assert) {
      var network = self.create()

      var expected = {
        onBeforeRequest: true,
        onBeforeSendHeaders: true,
        onSendHeaders: true,
        onHeadersReceived: true,
        onBeforeRedirect: false,
        onResponseStarted: true,
        onCompleted: true,
        onErrorOccurred: false
      }

      var result = network.existsInCurrentBVS(network.moments, tabId)

      var msg = ['Passed：', '在当前的backgroundViewStore中检查全部网络时刻是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在当前的backgroundViewStore中网络时刻', moment, expected[moment] ? '存在' : '不存在'].join('')
        assert.strictEqual(result[moment], expected[moment], msg)
      })
    })

    QUnit.test(["existsInSpecificBVS：在指定的backgroundViewStore中检查全部网络时刻是否存在"].join(''), function (assert) {
      var network = self.create()

      var expected = {
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
      var result = network.existsInSpecificBVS(network.moments, specificIndex, tabId)

      var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中检查全部网络时刻是否存在'].join('')
      assert.notStrictEqual(result.data, null, msg)

      network.moments.forEach(function (moment) {
        var msg = ['Passed：', '检查在指定的backgroundViewStore[', specificIndex, ']中网络时刻', moment, expected[moment] ? '存在' : '不存在'].join('')
        assert.strictEqual(result[moment], expected[moment], msg)
      })
    })
  },

  testExistsAPIs_derivative: function () {
    var self = this
    var tabId = self.config.mockData.tabId

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
      QUnit.test(["existsInAllBVS", moment, "：在全部的backgroundViewStore中检查网络时刻", moment, "是否存在"].join(''), function (assert) {
        var network = self.create()

        var expected = {
          onBeforeRequest: [true, true, true, true, true],
          onBeforeSendHeaders: [true, true, true, true, true],
          onSendHeaders: [true, true, true, true, true],
          onHeadersReceived: [true, true, true, true, true],
          onBeforeRedirect: [false, false, false, false, false],
          onResponseStarted: [true, true, true, true, true],
          onCompleted: [true, true, true, true, true],
          onErrorOccurred: [false, false, false, false, false]
        }

        var result = network['existsInAllBVS' + moment](tabId)

        var msg = ['Passed：', '在全部的backgroundViewStore中检查网络时刻', moment, '是否存在'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在全部的backgroundViewStore中网络时刻', moment, '的存在分布为', expected[moment]].join('')
        assert.deepEqual(result[moment], expected[moment], msg)
      })

      QUnit.test(["existsInCurrentBVS", moment, "：在当前的backgroundViewStore中检查网络时刻", moment, "是否存在"].join(''), function (assert) {
        var network = self.create()

        var expected = {
          onBeforeRequest: true,
          onBeforeSendHeaders: true,
          onSendHeaders: true,
          onHeadersReceived: true,
          onBeforeRedirect: false,
          onResponseStarted: true,
          onCompleted: true,
          onErrorOccurred: false
        }

        var result = network['existsInCurrentBVS' + moment](tabId)

        var msg = ['Passed：', '在当前的backgroundViewStore中检查网络时刻', moment, '是否存在'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在当前的backgroundViewStore中网络时刻', moment, expected[moment] ? '存在' : '不存在'].join('')
        assert.strictEqual(result[moment], expected[moment], msg)
      })

      QUnit.test(["existsInSpecificBVS", moment, "：在指定的backgroundViewStore中检查网络时刻", moment, "是否存在"].join(''), function (assert) {
        var network = self.create()

        var expected = {
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
        var result = network['existsInSpecificBVS' + moment](specificIndex, tabId)

        var msg = ['Passed：', '在指定的backgroundViewStore[', specificIndex, ']中检查网络时刻', moment, '是否存在'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查在指定的backgroundViewStore[', specificIndex, ']中网络时刻', moment, expected[moment] ? '存在' : '不存在'].join('')
        assert.strictEqual(result[moment], expected[moment], msg)
      })
    })
  }
})