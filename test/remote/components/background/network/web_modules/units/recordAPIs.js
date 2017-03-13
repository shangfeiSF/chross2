var moments = [
  'onBeforeRequest',  // 当请求即将发出时
  'onBeforeSendHeaders',   // 当请求即将发出，初始标头已经准备好时
  'onSendHeaders',  // 标头发送至网络前时
  'onHeadersReceived',  // 接收到 HTTP(S) 响应标头时
  'onBeforeRedirect',  // 当重定向即将执行时
  'onResponseStarted',  // 当接收到响应正文的第一个字节时
  'onCompleted',  // 当请求成功处理后
  'onErrorOccurred'  // 当请求不能成功处理时
]
var values = [
  {
    url: 'http://localhost/entry.html',
    details: {
      method: 'GET',
      type: 'main_frame'
    }
  },
  {
    url: 'http://localhost/css/red.css',
    details: {
      method: 'GET',
      type: 'stylesheet'
    }
  }
]

var Current = function () {
  QUnit.module('BVS', function () {
    QUnit.module('Core', function () {
      QUnit.test(['recordInCurrentBVS：在 Current BVS 中向 all 网络时刻新 record 一条记录'].join(''), function (assert) {
        var tabId = suit.mock.tabId
        var network = suit.beforeHook()

        var value = values[0]
        var stringify = JSON.stringify(value)

        var result = network.recordInCurrentBVS(moments, value, tabId)

        Object.keys(result).forEach(function (moment) {
          var item = result[moment]

          var msg = ['Passed：', '在 Current BVS 中向网络时刻', moment, '新添一条记录等于', stringify].join('')
          assert.notStrictEqual(item.data, null, msg)

          var msg = ['Passed：', '检查返回结果的属性等于', moment].join('')
          assert.deepEqual(item.data.key, moment, msg)

          var msg = ['Passed：', '检查返回结果的属性值等于', stringify].join('')
          assert.deepEqual(item.data.value[item.data.value.length - 1], value, msg)
        })
      })

      moments.forEach(function (moment, index) {
        QUnit.test(['recordInCurrentBVS：在 Current BVS 中向网络时刻', moment, '新 record 一条记录'].join(''), function (assert) {
          var tabId = suit.mock.tabId
          var network = suit.beforeHook()

          var value = values[index % 2]
          var stringify = JSON.stringify(value)

          var result = network.recordInCurrentBVS([moment], value, tabId)

          Object.keys(result).forEach(function (moment) {
            var item = result[moment]

            var msg = ['Passed：', '在 Current BVS 中向网络时刻', moment, '新添一条记录等于', stringify].join('')
            assert.notStrictEqual(item.data, null, msg)

            var msg = ['Passed：', '检查返回结果的属性等于', moment].join('')
            assert.deepEqual(item.data.key, moment, msg)

            var msg = ['Passed：', '检查返回结果的属性值等于', stringify].join('')
            assert.deepEqual(item.data.value[item.data.value.length - 1], value, msg)
          })
        })
      })
    })
  })
}

module.exports = function () {
  suit = this

  QUnit.module('recordAPIs', function () {
    QUnit.module('Current', Current)
  })
}