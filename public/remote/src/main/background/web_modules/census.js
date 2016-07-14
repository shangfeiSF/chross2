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
    var exists = self.chross.cache.exists(details.tabId, 'iframeList').data
    
    if (!exists) {
      needRecord = true
    } else {
      var list = self.chross.cache.get(details.tabId, 'iframeList')

      needRecord = list.data.every(function (iframe) {
        return iframe.frameId != details.frameId
      })
    }

    if (needRecord) {
      self.chross.cache.set(details.tabId, 'iframeIds', details.frameId)

      self.chross.cache.set(details.tabId, 'iframeList', {
        frameId: details.frameId,
        url: details.url,
        details: details
      })
    }
  },
})

module.exports = Census