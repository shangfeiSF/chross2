function Probe(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.chross = chross

  this.init()
}

$.extend(Probe.prototype, {
  init: function () {
    var self = this

    self.monitorCrossIframeUrl({
      urls: [['*:', self.chross.config.crossIframeURL, '*'].join('')]
    })
  },

  monitorCrossIframeUrl: function (options) {
    var self = this

    chrome.webRequest.onBeforeRequest.addListener(function (details) {
      var info = {
        frameId: details.frameId,
        parentFrameId: details.parentFrameId,
        requestId: details.requestId,
        tabId: details.tabId
      }

      var data = decodeURIComponent(details.url.split('__r_e_s_u_l_t__=').pop())
      data = JSON.parse(data)
      info.data = data

      var port = self.chross.port.getPortByTabId(details.tabId)

      if (port) {
        port.postMessage({
          type: 'private',
          content: 'run code in iframe',
          uuid: data.uuid,
          data: info
        })
      }
    }, options, ["blocking"])
  },
})

module.exports = Probe