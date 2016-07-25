var message = require('message')

function Probe(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, defaultConfig, config)

  this.chross = chross

  this.init()
}

$.extend(Probe.prototype, {
  monitorCrossIframeUrl: function (options) {
    var self = this

    chrome.webRequest.onBeforeRequest.addListener(function (details) {
      var port = self.chross.port.getPortByTabId(details.tabId)

      var result = decodeURIComponent(details.url.split('__r_e_s_u_l_t__=').pop())
      result = JSON.parse(result)

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

      port && port.postMessage(message.response(msg, output))
    }, options, ["blocking"])
  },

  init: function () {
    var self = this

    self.monitorCrossIframeUrl({
      urls: [['*:', self.chross.config.crossIframeURL, '*'].join('')]
    })
  }
})

module.exports = Probe