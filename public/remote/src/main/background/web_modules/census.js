function Census(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.chross = chross
}

$.extend(Census.prototype, {
  cnesusIframe: function (details) {
    var self = this

    var needRecord = true
    var result = self.chross.cache.getDataByTabId(details.tabId, 'iframeList')

    if (result.data === null) {
      if (result.msg.type == '404') {
        needRecord = false
      }
      else if (result.msg.type == '405') {
        needRecord = true
      }
    }
    else {
      needRecord = result.data.every(function (iframe) {
        return iframe.frameId != details.frameId
      })
    }

    if (needRecord) {
      self.chross.cache.setDataByTabId(details.tabId, 'iframeIds', details.frameId)

      self.chross.cache.setDataByTabId(details.tabId, 'iframeList', {
        frameId: details.frameId,
        url: details.url,
        details: details
      })
    }
  },
})

module.exports = Census