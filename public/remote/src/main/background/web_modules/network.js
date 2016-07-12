function Network(chross) {
  this.chross = chross

  this.init()
}

$.extend(Network.prototype, {
  onBeforeRequest: function () {
    var self = this

    chrome.webRequest.onBeforeRequest.addListener(function (details) {
      self.chross.cache.setDataByTabId(details.tabId, 'onBeforeRequest', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  onBeforeSendHeaders: function () {
    var self = this

    chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
      self.chross.cache.setDataByTabId(details.tabId, 'onBeforeSendHeaders', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  onSendHeaders: function () {
    var self = this
    chrome.webRequest.onSendHeaders.addListener(function (details) {
      self.chross.cache.setDataByTabId(details.tabId, 'onSendHeaders', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  onHeadersReceived: function () {
    var self = this
    chrome.webRequest.onHeadersReceived.addListener(function (details) {
      self.chross.cache.setDataByTabId(details.tabId, 'onHeadersReceived', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  onBeforeRedirect: function () {
    var self = this

    chrome.webRequest.onBeforeRedirect.addListener(function (details) {
      self.chross.cache.setDataByTabId(details.tabId, 'onBeforeRedirect', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  onResponseStarted: function () {
    var self = this

    chrome.webRequest.onResponseStarted.addListener(function (details) {
      self.chross.cache.setDataByTabId(details.tabId, 'onResponseStarted', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  onCompleted: function () {
    var self = this

    chrome.webRequest.onCompleted.addListener(function (details) {
      self.chross.cache.setDataByTabId(details.tabId, 'onCompleted', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  onErrorOccurred: function () {
    var self = this

    chrome.webRequest.onErrorOccurred.addListener(function (details) {
      self.chross.cache.setDataByTabId(details.tabId, 'onErrorOccurred', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  getDetails: function (moments, tabId, urlPattern) {
    var self = this
    var pattern = new RegExp(urlPattern)

    var details = {
      msg: ['The details of', urlPattern.toString(), 'occur', moments.join(', ')].join(' '),
      error: null,
      data: {}
    }

    moments.forEach(function (monment) {
      var records = self.chross.cache.getDataByTabId(tabId, monment)

      if (records.data) {
        var matches = records.data.filter(function (record) {
          return pattern.exec(record.url) !== null
        })

        details.data[monment] = matches
      }
      else {
        if (details.error === null) {
          details.error = {}
        }
        details.error[monment] = records.msg

        details.data[monment] = null
      }
    })

    return details
  },

  boot: function () {
    var self = this

    self.getDetailsOnBeforeRequest = self.getDetails.bind(self, ['onBeforeRequest'])
    self.getDetailsOnBeforeSendHeaders = self.getDetails.bind(self, ['onBeforeSendHeaders'])
    self.getDetailsOnSendHeaders = self.getDetails.bind(self, ['onSendHeaders'])
    self.getDetailsOnHeadersReceived = self.getDetails.bind(self, ['onHeadersReceived'])
    self.getDetailsOnBeforeRedirect = self.getDetails.bind(self, ['onBeforeRedirect'])
    self.getDetailsOnResponseStarted = self.getDetails.bind(self, ['onResponseStarted'])
    self.getDetailsOnCompleted = self.getDetails.bind(self, ['onCompleted'])
    self.getDetailsOnErrorOccurred = self.getDetails.bind(self, ['onErrorOccurred'])
  },

  init: function () {
    var self = this

    self.boot()

    // 当请求即将发出时
    self.onBeforeRequest()
    // 当请求即将发出，初始标头已经准备好时
    self.onBeforeSendHeaders()
    // 标头发送至网络前时
    self.onSendHeaders()
    // 接收到 HTTP(S) 响应标头时
    self.onHeadersReceived()
    // 当重定向即将执行时
    self.onBeforeRedirect()
    // 当接收到响应正文的第一个字节时
    self.onResponseStarted()
    // 当请求成功处理后
    self.onCompleted()
    // 当请求不能成功处理时
    self.onErrorOccurred()
  }
})

module.exports = Network