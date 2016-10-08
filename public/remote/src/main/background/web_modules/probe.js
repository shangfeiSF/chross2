var message = require('message')

function Probe(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, {}, defaultConfig, config)

  this.chross = chross

  this.init()
}

$.extend(Probe.prototype, {
  monitorCrossIframeUrl: function (options) {
    var self = this

    chrome.webRequest.onBeforeRequest.addListener(function (details) {
      // 解析URL中__r_e_s_u_l_t__携带的执行结果
      var result = decodeURIComponent(details.url.split('__r_e_s_u_l_t__=').pop())
      result = JSON.parse(result)

      // 拼接发送给注入脚本的msg和output
      var msg = {
        sign: result.sign,
        command: 'runCodeInIframe',
        params: result.params,
        data: result.data
      }

      var output = {
        value: result.value,
        extra: {
          tabId: details.tabId,
          frameId: details.frameId,
          parentFrameId: details.parentFrameId
        },
        status: 'success'
      }

      // 通过port发送到注入脚本
      var port = self.chross.port.getPortByTabId(details.tabId)

      port && port.postMessage(message.response(msg, output))
    }, options, ["blocking"])
  },

  init: function () {
    var self = this

    // 监听在iframe中执行代码后用于回传执行结果的URL
    self.monitorCrossIframeUrl({
      urls: [['*:', self.chross.config.crossIframeURL, '*'].join('')]
    })
  }
})

module.exports = Probe