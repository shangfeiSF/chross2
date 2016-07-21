$.extend(Suite.prototype, {
  testRecordAPIs_core: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.test(["recordInCurrentBVS：在当前的backgroundViewStore中为某一个网络时刻新添一条记录"].join(''), function (assert) {
      var network = self.create()

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

      network.moments.forEach(function (moment, index) {
        var value = values[index % 2]
        var stringify = JSON.stringify(value)

        var result = network.recordInCurrentBVS(moment, value, tabId)

        var msg = ['Passed：', '在当前的backgroundViewStore中为网络时刻为', moment, '成功添加一条记录(', stringify, ')'].join('')
        assert.notStrictEqual(result.data, null, msg)

        var msg = ['Passed：', '检查添加之后返回结果的属性等于', moment].join('')
        assert.strictEqual(result.data.key, moment, msg)
        var msg = ['Passed：', '检查添加之后返回结果的属性值等于', stringify].join('')
        assert.deepEqual(result.data.value[result.data.value.length - 1], value, msg)
      })
    })
  }
})