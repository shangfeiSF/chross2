var Census = require('census')

function Network(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.census = new Census(chross)

  this.moments = ['onBeforeRequest', 'onBeforeSendHeaders', 'onSendHeaders', 'onHeadersReceived', 'onBeforeRedirect', 'onResponseStarted', 'onCompleted', 'onErrorOccurred']

  this.malias = {
    brq: 'onBeforeRequest',
    bsh: 'onBeforeSendHeaders',
    sh: 'onSendHeaders',
    hr: 'onHeadersReceived',
    brd: 'onBeforeRedirect',
    rs: 'onResponseStarted',
    c: 'onCompleted',
    eo: 'onErrorOccurred'
  }

  this.chross = chross

  this.init()
}

$.extend(Network.prototype, {
  onBeforeRequest: function () {
    var self = this

    chrome.webRequest.onBeforeRequest.addListener(function (details) {
      self.census.cnesusIframe(details)

      self.chross.cache.set(details.tabId, 'onBeforeRequest', {
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
      self.chross.cache.set(details.tabId, 'onBeforeSendHeaders', {
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
      self.chross.cache.set(details.tabId, 'onSendHeaders', {
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
      self.chross.cache.set(details.tabId, 'onHeadersReceived', {
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
      self.chross.cache.set(details.tabId, 'onBeforeRedirect', {
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
      self.chross.cache.set(details.tabId, 'onResponseStarted', {
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
      self.chross.cache.set(details.tabId, 'onCompleted', {
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
      self.chross.cache.set(details.tabId, 'onErrorOccurred', {
        url: details.url,
        details: details
      })
    }, {
      urls: ["<all_urls>"]
    })
  },

  get: function (moments, tabId, urlPattern) {
    var self = this
    var pattern = new RegExp(urlPattern)

    var details = {
      msg: ['The details of', urlPattern.toString(), 'occur', moments.join(', '), 'of the lastest view of tab', tabId].join(' '),
      error: null,
      data: {}
    }

    moments.forEach(function (monment) {
      var records = self.chross.cache.get(tabId, monment)

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

  getView: function (moments, tabId, viewIndex, urlPattern) {
    var self = this
    var pattern = new RegExp(urlPattern)

    var details = {
      msg: ['The details of', urlPattern.toString(), 'occur', moments.join(', '), 'of the view ranked', viewIndex, 'of tab', tabId].join(' '),
      error: null,
      data: {}
    }

    moments.forEach(function (monment) {
      var records = self.chross.cache.getInView(tabId, viewIndex, monment)

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

    self.getOnBeforeRequest = self.get.bind(self, ['onBeforeRequest'])
    self.getOnBeforeSendHeaders = self.get.bind(self, ['onBeforeSendHeaders'])
    self.getOnSendHeaders = self.get.bind(self, ['onSendHeaders'])
    self.getOnHeadersReceived = self.get.bind(self, ['onHeadersReceived'])
    self.getOnBeforeRedirect = self.get.bind(self, ['onBeforeRedirect'])
    self.getOnResponseStarted = self.get.bind(self, ['onResponseStarted'])
    self.getOnCompleted = self.get.bind(self, ['onCompleted'])
    self.getOnErrorOccurred = self.get.bind(self, ['onErrorOccurred'])

    self.getViewOnBeforeRequest = self.getView.bind(self, ['onBeforeRequest'])
    self.getViewOnBeforeSendHeaders = self.getView.bind(self, ['onBeforeSendHeaders'])
    self.getViewOnSendHeaders = self.getView.bind(self, ['onSendHeaders'])
    self.getViewOnHeadersReceived = self.getView.bind(self, ['onHeadersReceived'])
    self.getViewOnBeforeRedirect = self.getView.bind(self, ['onBeforeRedirect'])
    self.getViewOnResponseStarted = self.getView.bind(self, ['onResponseStarted'])
    self.getViewOnCompleted = self.getView.bind(self, ['onCompleted'])
    self.getViewOnErrorOccurred = self.getView.bind(self, ['onErrorOccurred'])
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