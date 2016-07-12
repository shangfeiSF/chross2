function Probe(chross, config) {
  var config = config || {}

  this.defaultConfig = {}

  this.config = $.extend(this.defaultConfig, config)

  this.chross = chross

  this.init()
}

$.extend(Probe.prototype, {
  init: function () {
    var self = this

    self.monitorCrossIframeUrl({
      urls: [['*:', self.config.crossIframeURL, '*'].join('')]
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

      var port = self.chross.port.findPortByTabId[details.tabId]

      if (port) {
        port.postMessage({
          msg: 'run code in iframe',
          uuid: data.uuid,
          data: info
        })
      }
    }, options)
  },
})

module.exports = Probe