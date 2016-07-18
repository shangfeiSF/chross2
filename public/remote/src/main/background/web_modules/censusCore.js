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
      var result = cache.getInCurrentBVS('frameList', tabId).data

      if (result.data === null) {
        console.error(result.msg)
        return false
      }

      if (result.key === undefined) {
        needRecord = true
      }
      else {
        needRecord = result.value.every(function (iframe) {
          return iframe.frameId != details.frameId
        })
      }

      if (needRecord) {
        cache.recordInCurrentBVS('frameIds', details.frameId, tabId)

        cache.recordInCurrentBVS('frameList', {
          frameId: details.frameId,
          url: details.url,
          details: details
        }, tabId)
      }
    },
  }
}