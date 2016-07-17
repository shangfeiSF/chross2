var Census = require('census')

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

var core = {}
var derivedCoreGroupsByBoot = [
  'existsAPIs',
  'getAPIs',
  'filterAPIs'
]

core.recordAPIs = {
  recordInCurrentBVS: function (moment, record, tabId) {
    var self = this

    self.chross.cache.recordInCurrentBVS(moment, record, tabId)
  }
}

core.existsAPIs = {
  existsInAllBVS: function (moments, tabId) {
    var self = this
    var exists = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.existsInAllBVS(moment, tabId)
      exists[moment] = result.data !== null ? result.data : result.msg
    })

    return exists
  },
  existsInCurrentBVS: function (moments, tabId) {
    var self = this
    var exists = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.existsInCurrentBVS(moment, tabId)
      exists[moment] = result.data !== null ? result.data : result.msg
    })

    return exists
  },
  existsInSpecificBVS: function (moments, index, tabId) {
    var self = this
    var exists = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.existsInSpecificBVS(moment, index, tabId)
      exists[moment] = result.data !== null ? result.data : result.msg
    })

    return exists
  }
}

core.getAPIs = {
  getInAllBVS: function (moments, tabId) {
    var self = this
    var details = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.getInAllBVS(moment, tabId)
      details[moment] = result.data
    })

    return details
  },
  getInCurrentBVS: function (moments, tabId) {
    var self = this
    var details = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.getInCurrentBVS(moment, tabId)
      details[moment] = result.data
    })

    return details
  },
  getInSpecificBVS: function (moments, index, tabId) {
    var self = this
    var details = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.getInSpecificBVS(moment, index, tabId)
      details[moment] = result.data
    })

    return details
  }
}

core.filterAPIs = {
  filterInAllBVS: function (moments, pattern, tabId) {
    var self = this
    var pattern = new RegExp(pattern)
    var details = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.getInAllBVS(moment, tabId)
      details[moment] = result.data.map(function (item) {
        if (item.key === undefined) {
          return item
        }
        else {
          return {
            key: item.key,
            value: item.value.filter(function (value) {
              return pattern.exec(value.url) !== null
            })
          }
        }
      })
    })

    return details
  },
  filterInCurrentBVS: function (moments, patterm, tabId) {
    var self = this
    var pattern = new RegExp(pattern)
    var details = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.getInCurrentBVS(moment, tabId)
      details[moment] = result.data.map(function (item) {
        if (item.key === undefined) {
          return item
        }
        else {
          return {
            key: item.key,
            value: item.value.filter(function (value) {
              return pattern.exec(value.url) !== null
            })
          }
        }
      })
    })

    return details
  },
  filterInSpecificBVS: function (moments, patterm, index, tabId) {
    var self = this
    var pattern = new RegExp(pattern)
    var details = {}

    moments.forEach(function (moment) {
      var result = self.chross.cache.getInSpecificBVS(moment, tabId)
      details[moment] = result.data.map(function (item) {
        if (item.key === undefined) {
          return item
        }
        else {
          return {
            key: item.key,
            value: item.value.filter(function (value) {
              return pattern.exec(value.url) !== null
            })
          }
        }
      })
    })

    return details
  }
}

$.extend(Network.prototype,
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
  core.recordAPIs,
  core.existsAPIs,
  core.getAPIs,
  core.filterAPIs,
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
          self.handler(moment, {
            url: details.url,
            details: details
          }, details.tabId)
        }, self.monitorRange)
      })
    }
  },
  // Network 的初始化方法
  {
    boot: function () {
      var self = this

      Object.keys(core).forEach(function (group) {
        if (derivedCoreGroupsByBoot.indexOf(group) > -1) {
          Object.keys(core[group]).forEach(function (coreAPI) {
            var derivativeAPIs = {}

            self.moments.forEach(function (moment) {
              derivativeAPIs[coreAPI + moment] = self[coreAPI].bind(self, [moment])
            })
            derivativeAPIs[coreAPI + 'onAllMoments'] = self[coreAPI].bind(self, self.moments)

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