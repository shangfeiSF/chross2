var cacheCore = require('cacheCore')

function Cache(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  // 客户只读
  this.tabsMap = {}

  // 客户可读可写
  this.userTabsMap = {}

  this.chross = chross

  this.init()
}

$.extend(Cache.prototype,
  cacheCore.groups.setAPIs,
  cacheCore.groups.recordAPIs,
  cacheCore.groups.existsAPIs,
  cacheCore.groups.getAPIs,
  cacheCore.groups.getViewAPIs,
  {
    msg: {
      noneTabStore: function (tabId) {
        return ['Can not find tabStore by tabId=', tabId].join('')
      },
      noneViewStore: function (index, tabId) {
        if (index == 'all') {
          return ['Can not find any viewStores belongs to the tab with tabId=', tabId].join('')
        }
        else if (index == 'current') {
          return ['Can not find the curent viewStore belongs to the tab with tabId=', tabId].join('')
        }
        else {
          return ['Can not find the specific viewStore with index=', index, 'belongs to the tab with tabid=', tabId].join('')
        }
      },
      // noneAttribute暂时没有使用
      noneAttribute: function (attribute, index, tabId) {
        if (index == 'all') {
          return ['Can not find the', attribute, 'attribute in the any viewStores belongs to the tab with tabId=', tabId].join('')
        }
        else if (index == 'current') {
          return ['Can not find the', attribute, 'attribute in the current viewStore belongs to the tab with tabId=', tabId].join('')
        }
        else {
          return ['Can not find the', attribute, 'attribute in the specific viewStore with index=', index, 'belongs to the tab with tabId=', tabId].join('')
        }
      },
    },

    postfixSpec: {
      BVS: 'The viewSotre that admins by background, user is read-only。',
      UVS: 'The viewStore taht admins by user himself, user is readable and writable naturally.'
    }
  },
  // 管理tabStore viewStore，保证viewStore准确性的方法
  {
    inspectActiveTab: function (tabId) {
      var defer = $.Deferred()
      var promise = defer.promise()

      // tabStore一定存在，因为 onTabCreated 先于 onBeforeNavigate 触发
      // 所以这里使用chrom.tabs.query查询activeTab应该可以省略
      // TODO: 有待验证上述猜想
      chrome.tabs.query({active: true}, function (tabs) {
        var activeTab = tabs[0]
        defer.resolve(activeTab && activeTab.id == tabId)
      })

      return promise
    },

    createTabStore: function (tabId) {
      var self = this

      self.tabsMap[tabId] = new Array()
      self.userTabsMap[tabId] = new Array()
    },

    clearTabStore: function (tabId) {
      var self = this

      delete self.tabsMap[tabId]
      delete self.userTabsMap[tabId]
    },

    createViewStore: function (tabId, isWaiting) {
      var self = this

      var tabStore = self.tabsMap[tabId]
      var userTabStore = self.userTabsMap[tabId]

      var timeStamp = new Date().toJSON()

      var viewStore = {
        timeStamp: timeStamp
      }
      var userViewStore = {
        timeStamp: timeStamp
      }

      if (isWaiting) {
        viewStore.waiting = true
        userViewStore.waiting = true
      }

      tabStore.push(viewStore)
      userTabStore.push(userViewStore)
    },

    recordTabStore: function (tabId) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      var tabStore = self.tabsMap[tabId]
      tabStore = JSON.stringify(tabStore)

      var formData = new FormData()
      formData.append('tabStore', tabStore)

      var ajaxConfig = {
        type: 'post',
        url: 'http://localhost/recordTabStore',
        processData: false,
        contentType: false,
        data: formData,
      }

      $.when($.ajax(ajaxConfig))
        .done(function (result) {
          defer.resolve(result.status == 200)
        })
        .fail(function () {
          defer.resolve(false)
        })

      return promise
    }
  },
  // Cache 监听的三个关键时刻：onBeforeNavigate，onTabCreated，onTabRemoved
  {
    onBeforeNavigate: function () {
      var self = this

      chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
        if (details.frameId !== 0) return false
        var tabId = details.tabId

        // tabStore一定存在，因为 onTabCreated 先于 onBeforeNavigate 触发
        var tabStore = self.tabsMap[tabId]
        var viewStore = tabStore[tabStore.length - 1]

        var userTabStore = self.userTabsMap[tabId]
        var userViewStore = userTabStore[userTabStore.length - 1]

        self.inspectActiveTab(tabId).then(function (result) {
          if (!result) {
            console.warn('The current Tab is not active tab when init viewStore！！！')
            return false
          }

          if (viewStore.waiting) {
            delete viewStore.waiting
            delete userViewStore.waiting
          }
          else {
            self.createViewStore(tabId, false)
          }
        })
      })
    },

    onTabCreated: function () {
      var self = this

      chrome.tabs.onCreated.addListener(function (tab) {
        /*
         * 只要新打开一个标签页，就需要新建tabStore数组和userTabStore数组
         * 并且初始化一个viewStore和一个userViewStore
         * waiting = true 表示该store正在等待存储数据
         * delete waiting 后将表示该store已经开始存储数据（避免这种类型的私有数据在用户使用时暴露出去）
         *  一旦创建新的标签页或者使用chross.navigation.urlChange()
         * 都会创建一个新的viewStore和一个新的userViewStore（由onTabCreated或者mockTabCreated完成）
         * 并设置 waiting = true，保证在之后的 onBeforeNavigate 中不再创建新的store
         * 而是直接启用 waiting = true 的viewStore，并 delete waiting
         * */
        self.createTabStore(tab.id)
        self.createViewStore(tab.id, true)
      })
    },

    onTabRemoved: function () {
      var self = this

      chrome.tabs.onRemoved.addListener(function (tabId) {
        self.recordTabStore(tabId)
          .then(function (status) {
            status && self.clearTabStore(tabId)
          })
      })
    }
  },
  // Cache 的初始化方法
  {
    boot: function () {
      var self = this

      Object.keys(cacheCore.groups).forEach(function (group) {
        if (cacheCore.derivedGroups.indexOf(group) > -1) {
          Object.keys(cacheCore.groups[group]).forEach(function (API) {
            var description = API.match(/\b(\w+)(?=VS\b)/g)

            if (description && description.length == 1) {
              description = description.pop()

              var derivativeAPIs = {}
              derivativeAPIs[description + 'BVS'] = self[description + 'VS'].bind(self, 'tabsMap')
              derivativeAPIs[description + 'UVS'] = self[description + 'VS'].bind(self, 'userTabsMap')

              $.extend(Cache.prototype, derivativeAPIs)
            }
          })
        }
      })
    },

    init: function () {
      var self = this

      if (self.boot !== null) {
        self.boot()
        $.extend(Cache.prototype, {boot: null})
      }

      // 导航即将开始之前
      self.onBeforeNavigate()
      // 创建标签页时
      self.onTabCreated()
      // 关闭标签页时
      self.onTabRemoved()
    }
  }
)

module.exports = Cache