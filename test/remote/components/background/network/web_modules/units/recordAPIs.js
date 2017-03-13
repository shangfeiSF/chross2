var moments = require('momentsConfig').moments
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