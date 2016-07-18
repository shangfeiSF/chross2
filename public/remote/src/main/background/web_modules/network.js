var Census = require('census')
var networkCore = require('networkCore')

function Network(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.census = new Census(chross, {
    moments: this.moments,
    malias: this.malias
  })

  this.chross = chross

  this.init()
}

$.extend(Network.prototype,
  networkCore.groups.recordAPIs,
  networkCore.groups.existsAPIs,
  networkCore.groups.getAPIs,
  networkCore.groups.filterAPIs,
  {
    moments: [
      'onBeforeRequest',  // 当请求即将发出时
      'onBeforeSendHeaders',   // 当请求即将发出，初始标头已经准备好时
      'onSendHeaders',  // 标头发送至网络前时
      'onHeadersReceived',  // 接收到 HTTP(S) 响应标头时
      'onBeforeRedirect',  // 当重定向即将执行时
      'onResponseStarted',  // 当接收到响应正文的第一个字节时
      'onCompleted',  // 当请求成功处理后
      'onErrorOccurred'  // 当请求不能成功处理时
    ],

    malias: {
      brq: 'onBeforeRequest',
      bsh: 'onBeforeSendHeaders',
      sh: 'onSendHeaders',
      hr: 'onHeadersReceived',
      brd: 'onBeforeRedirect',
      rs: 'onResponseStarted',
      c: 'onCompleted',
      eo: 'onErrorOccurred'
    },

    monitorRange: {
      urls: ["<all_urls>"]
    }
  },
  // NetWork 全程监听记录的网络请求关键时刻
  {
    handler: function (moment, record, tabId) {
      var self = this

      self.recordInCurrentBVS(moment, record, tabId)
      self.census.tasks[moment].forEach(function (task) {
        task(record.details)
      })
    },

    monitor: function () {
      var self = this
      var moments = self.moments

      moments.forEach(function (moment) {
        chrome.webRequest[moment].addListener(function (details) {
          // 监听chross设置的crossIframeURL，减少对原始页面network统计的影响
          if (self.config.monitorFilter.exec(details.url) === null && details.tabId > -1) {
            self.handler(moment, {
              url: details.url,
              details: details
            }, details.tabId)
          }
        }, self.monitorRange)
      })
    }
  },
  // Network 的初始化方法
  {
    boot: function () {
      var self = this

      self.config.monitorFilter = new RegExp(self.chross.config.crossIframeURL)

      Object.keys(networkCore.groups).forEach(function (group) {
        if (networkCore.derivedGroups.indexOf(group) > -1) {
          Object.keys(networkCore.groups[group]).forEach(function (API) {
            var derivativeAPIs = {}

            self.moments.forEach(function (moment) {
              derivativeAPIs[API + moment] = self[API].bind(self, [moment])
            })
            derivativeAPIs[API + 'onAllMoments'] = self[API].bind(self, self.moments)

            $.extend(Network.prototype, derivativeAPIs)
          })
        }
      })
    },

    init: function () {
      var self = this

      if (self.boot !== null) {
        self.boot()
        $.extend(Network.prototype, {boot: null})
      }

      self.monitor()
    }
  }
)

module.exports = Network