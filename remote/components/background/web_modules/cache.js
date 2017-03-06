var cacheCore = require('cacheCore')
var moments = require('momentsConfig').moments

function Cache(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, {}, defaultConfig, config)

  // user read-only
  this.tabsMap = {}

  // user readable and writable
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
    protocolPicker: /([\w\-]*)(?=\:\/\/).*/,

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
          return ['Can not find the specific viewStore with index=', index, ' belongs to the tab with tabid=', tabId].join('')
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
  // 管理tabStore和viewStores，保证viewStore和实际pv可以吻合
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

    createTabStore: function (tab) {
      var self = this

      var tabId = tab.id
      var timeStamp = new Date().toJSON()

      self.tabsMap[tabId] = {
        timeStamp: timeStamp,
        viewStores: []
      }

      self.userTabsMap[tabId] = {
        timeStamp: timeStamp,
        viewStores: []
      }
    },

    clearTabStore: function (tabId) {
      var self = this

      delete self.tabsMap[tabId]
      delete self.userTabsMap[tabId]
    },

    createViewStore: function (tab, isWaiting) {
      var self = this

      var tabId = tab.id
      var url = tab.url
      var protocol = self.protocolPicker.exec(url).pop()

      var tabStore = self.tabsMap[tabId]
      var userTabStore = self.userTabsMap[tabId]

      var timeStamp = new Date().toJSON()

      var viewStore = {
        url: url,
        protocol: protocol,
        timeStamp: timeStamp
      }
      var userViewStore = {
        url: url,
        protocol: protocol,
        timeStamp: timeStamp
      }

      if (isWaiting) {
        viewStore.waiting = true
        userViewStore.waiting = true
      }

      tabStore.viewStores.push(viewStore)
      userTabStore.viewStores.push(userViewStore)
    },

    formatViewStore: function (tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      var formated = {
        tabId: tabId,
        timeStamp: tabStore.timeStamp,
        viewStores: []
      }

      $.each(tabStore.viewStores, function (i, viewStore) {
        var store = {
          _openedDevTool: viewStore._openedDevTool,
          frameIds: viewStore.frameIds,
          frameList: viewStore.frameList,
          protocol: viewStore.protocol,
          timeStamp: viewStore.timeStamp,
          requests: {}
        }

        $.each(moments, function (j, moment) {
          if (viewStore[moment]) {
            $.each(viewStore[moment], function (k, info) {
              var details = info.details
              var requestId = details.requestId

              if (store.requests[requestId] === undefined) {
                store.requests[requestId] = {
                  url: details.url,
                  method: details.method,
                  frameId: details.frameId,
                  parentFrameId: details.parentFrameId,
                  type: details.type
                }
              }

              store.requests[requestId][moment] = {
                timeStamp: details.timeStamp
              }
            })
          }
        })

        store.length = Object.keys(store.requests).length
        formated.viewStores.push(store)
      })

      return formated
    },

    recordTabStore: function (tabId) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      var tabStore = self.formatViewStore(tabId)
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
        var viewStore = tabStore.viewStores[tabStore.viewStores.length - 1]

        var userTabStore = self.userTabsMap[tabId]
        var userViewStore = userTabStore.viewStores[userTabStore.viewStores.length - 1]

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
            /*
             *  直接在chrome地址栏重载或者刷新页面
             *  可能会造成viewStore数据的混乱！！
             *  强烈建议先使用chross.navigation.urlChange()通知chross的background即将到来的urlChange
             *  然后在.then()中使用window.location来改变url
             * */
            self.createViewStore({
              id: tabId,
              url: details.url
            }, false)
          }
        })
      })
    },

    onTabCreated: function () {
      var self = this

      chrome.tabs.onCreated.addListener(function (tab) {
        var filterResult = self.chross.urlFilter.ignore({
          url: tab.url
        })
        if (filterResult.length) {
          filterResult.forEach(function (match) {
            var msg = '%cIgnore url: ' + match.shift()
            console.log(msg, 'color: #ff4400; font-weight: bold;')
          })
          return false
        }
        /*
         * 只要新打开一个标签页，就需要clearTabStore新建一个tabStore对象和一个userTabStore对象
         * tabStore对象和userTabStore对象都初始化一个viewStores数组，并打上timeStamp时间戳
         * */
        self.createTabStore(tab)
        /*
         * createViewStore: function (tab, isWaiting)
         * createViewStore的isWaiting参数传入true，新建的viewStore设置waiting=true，表示新建的viewStore正在等待存储数据
         *
         * 在onBeforeNavigate方法中会检查最新的viewStore
         * 存在waiting=true的viewStore时，直接delete waiting，表示该viewStore已经可以开始存储数据，同时避免这种类型的私有数据暴露出去
         * 不存在waiting=true的viewStore时，需要新建viewStore设置waiting=true，表示新建的viewStore无需等待，可以直接存储数据
         *
         *  创建新的标签页时，由onTabCreated方法会新建tabStore，新建viewStore
         *  使用chross.navigation.urlChange()时，直接调用createViewStore方法，在当前的tabStore的viewStores数组中，新建viewStore
         *  上述两种情况都会传入参数isWaiting = true，
         *  新建viewStore中waiting = true，如此保证在之后的onBeforeNavigate方法中不再新建viewStore
         *  先delete waiting属性，然后直接启用最新viewStore存储数据
         *
         * */
        self.createViewStore(tab, true)
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
          var APIs = cacheCore.groups[group]

          Object.keys(APIs).forEach(function (API) {
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

      // 避免在本地单元测试时启动chrome上的navigation
      if (self.chross !== undefined && !self.chross['onlyBoot']) {
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
      else {
        // 进行单元测试时需要反复创建新的APIs
        self.boot()
      }
    }
  }
)

module.exports = Cache