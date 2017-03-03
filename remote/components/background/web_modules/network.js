var Census = require('census')
var networkCore = require('networkCore')
var momentsConfig = require('momentsConfig')

function Network(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, {}, defaultConfig, config)

  this.census = new Census(chross)

  this.chross = chross

  this.init()
}

$.extend(Network.prototype,
  momentsConfig,

  networkCore.groups.recordAPIs,
  networkCore.groups.existsAPIs,
  networkCore.groups.getAPIs,
  networkCore.groups.filterAPIs,

  {
    monitorFilter: '',

    monitorRange: {
      urls: ["<all_urls>"]
    }
  },
  // NetWork 全程监听记录的网络请求关键时刻
  {
    handler: function (moment, record, tabId) {
      var self = this

      self.recordInCurrentBVS([moment], record, tabId)
      // 执行网络统计任务
      // 包括chross预定义的通用任务（censusCore中注册、定义的统计方法）
      // 还包括user自定义的用户任务（self.chross.userTasks中定义的统计方法）
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
          if (self.monitorFilter.exec(details.url) === null && details.tabId > -1) {
            var tabStore = self.chross.cache.tabsMap[details.tabId]
            if (tabStore === undefined) return false

            var viewStores = tabStore.viewStores
            var currentViewStore = viewStores[viewStores.length - 1]

            if (details.type === 'other' && currentViewStore._openedDevTool === undefined) {
              currentViewStore._openedDevTool = true
            }

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

      self.monitorFilter = new RegExp(self.chross.config.crossIframeURL)

      Object.keys(networkCore.groups).forEach(function (group) {
        if (networkCore.derivedGroups.indexOf(group) > -1) {
          var APIs = networkCore.groups[group]

          Object.keys(APIs).forEach(function (API) {
            var derivativeAPIs = {}

            self.moments.forEach(function (moment) {
              derivativeAPIs[API + moment] = self[API].bind(self, [moment])
            })
            derivativeAPIs[API + 'onAllMoments'] = self[API].bind(self, self.moments)

            $.extend(self, derivativeAPIs)
          })
        }
      })
    },

    init: function () {
      var self = this

      // 避免在本地单元测试时启动chrome上的webRequest
      if (self.chross !== undefined && !self.chross['onlyBoot']) {
        if (self.boot !== null) {
          self.boot()
          $.extend(Network.prototype, {boot: null})
        }

        self.monitor()
      }
      else {
        // 进行单元测试时需要反复创建新的APIs
        self.boot()
      }
    }
  }
)

module.exports = Network