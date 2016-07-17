module.exports = {
  executionRegistry: {
    onBeforeRequest: ['cnesusFrameDetails'],
    onBeforeSendHeaders: [],
    onSendHeaders: [],
    onHeadersReceived: [],
    onBeforeRedirect: [],
    onResponseStarted: [],
    onCompleted: [],
    onErrorOccurred: []
  },

  taskHandlers: {
    cnesusFrameDetails: function (details) {
      var self = this
      var cache = self.chross.cache
      var tabId = details.tabId

      var needRecord = true
      var result = cache.getInCurrentBVS('frameList', tabId)

      if (result.key === undefined) {
        needRecord = true
      }
      else {
        needRecord = result.value.every(function (iframe) {
          return iframe.frameId != details.frameId
        })
      }

      if (needRecord) {
        cache.setInCurrentBVS('frameIds', details.frameId, tabId)

        cache.setInCurrentBVS('frameList', {
          frameId: details.frameId,
          url: details.url,
          details: details
        }, tabId)
      }
    },
  }
}