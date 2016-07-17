function Cache(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  // 用户只读 tabsMap
  this.tabsMap = {}

  // 用户可读可写 customerTabsMap
  this.customerTabsMap = {}

  this.chross = chross

  this.msg = {
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
  }

  this.init()
}

$.extend(Cache.prototype,
  // tabId 设计为第三个参数的目的：保证只有三个参数参数时才能正确找到tabStore

  // tabStore(tabId)的全部viewStore、当前viewStore、指定的viewStore中设置key-value型数据
  {
    setInAllVS: function (key, value, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      if (!tabStore.length) return {
        msg: self.msg.noneViewStore('all', tabId),
        data: null
      }

      tabStore.forEach(function (viewStore) {
        viewStore[key] = value
      })

      return {
        msg: 'success',
        data: tabStore
      }
    },
    setInCurrentVS: function (key, value, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var currentVS = tabStore[tabStore.length - 1]
      if (!currentVS) return {
        msg: self.msg.noneViewStore('current', tabId)
      }

      currentVS[key] = value

      return {
        msg: 'success',
        data: currentVS
      }
    },
    setInSpecificVS: function (key, value, index, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var specificVS = tabStore[index]
      if (!specificVS) return {
        msg: self.msg.noneViewStore(index, tabId),
        data: null
      }

      specificVS[key] = value

      return {
        msg: 'success',
        data: specificVS
      }
    }
  },
  // tabStore(tabId)的全部viewStore、当前viewStore、指定的viewStore中添加一条记录型数据
  {
    recordInAllVS: function (library, record, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      if (!tabStore.length) return {
        msg: self.msg.noneViewStore('all', tabId),
        data: null
      }

      tabStore.forEach(function (viewStore) {
        !viewStore.hasOwnProperty(library) && (viewStore[library] = new Array())
        viewStore[library].push(record)
      })

      return {
        msg: 'success',
        data: tabStore
      }
    },
    recordInCurrentVS: function (library, record, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var currentVS = tabStore[tabStore.length - 1]
      if (!currentVS) return {
        msg: self.msg.noneViewStore('current', tabId)
      }

      !currentVS.hasOwnProperty(library) && (currentVS[library] = new Array())
      currentVS[library].push(record)

      return {
        msg: 'success',
        data: currentVS
      }
    },
    recordInSpecificVS: function (library, record, index, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var specificVS = tabStore[index]
      if (!specificVS) return {
        msg: self.msg.noneViewStore(index, tabId),
        data: null
      }

      !specificVS.hasOwnProperty(library) && (specificVS[library] = new Array())
      specificVS[library].push(record)

      return {
        msg: 'success',
        data: specificVS
      }
    }
  },
  // tabStore(tabId)的全部viewStore、当前viewStore、指定的viewStore中检查指定属性的存在性
  {
    existsInAllVS: function (prop, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      if (!tabStore.length) return {
        msg: self.msg.noneViewStore('all', tabId),
        data: null
      }

      var exists = tabStore.map(function (viewStore) {
        return viewStore.hasOwnProperty(prop)
      })

      return {
        msg: 'success',
        data: exists
      }
    },
    existsInCurrentVS: function (prop, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var currentVS = tabStore[tabStore.length - 1]
      if (!currentVS) return {
        msg: self.msg.noneViewStore('current', tabId)
      }

      var exists = currentVS.hasOwnProperty(prop)

      return {
        msg: 'success',
        data: exists
      }
    },
    existsInSpecificVS: function (prop, index, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var specificVS = tabStore[index]
      if (!specificVS) return {
        msg: self.msg.noneViewStore(index, tabId),
        data: null
      }

      var exists = specificVS.hasOwnProperty(prop)

      return {
        msg: 'success',
        data: exists
      }
    }
  },
  // tabStore(tabId)的全部viewStore、当前viewStore、指定的viewStore中获取指定的属性值
  {
    getInAllVS: function (key, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      if (!tabStore.length) return {
        msg: self.msg.noneViewStore('all', tabId),
        data: null
      }

      var result = tabStore.map(function (viewStore) {
        if (viewStore.hasOwnProperty(key)) {
          return {
            key: key,
            value: viewStore[key]
          }
        }
        else {
          return {
            key: undefined,
            value: undefined
          }
        }
      })

      return {
        msg: 'success',
        data: result
      }
    },
    getInCurrentVS: function (key, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var currentVS = tabStore[tabStore.length - 1]
      if (!currentVS) return {
        msg: self.msg.noneViewStore('current', tabId)
      }

      var result = {
        key: undefined,
        value: undefined
      }
      if (currentVS.hasOwnProperty(key)) {
        result = {
          key: key,
          value: currentVS[key]
        }
      }

      return {
        msg: 'success',
        data: result
      }
    },
    getInSpecificVS: function (key, index, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var specificVS = tabStore[index]
      if (!specificVS) return {
        msg: self.msg.noneViewStore(index, tabId),
        data: null
      }

      var result = {
        key: undefined,
        value: undefined
      }
      if (specificVS.hasOwnProperty(key)) {
        result = {
          key: key,
          value: specificVS[key]
        }
      }

      return {
        msg: 'success',
        data: result
      }
    },
  },
  // tabStore(tabId)的全部viewStore、当前viewStore、指定的viewStore
  {
    getAllVS: function (tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      if (!tabStore.length) return {
        msg: self.msg.noneViewStore('all', tabId),
        data: null
      }

      return {
        msg: 'success',
        data: tabStore
      }
    },
    getCurrentVS: function (tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var currentVS = tabStore[tabStore.length - 1]
      if (!currentVS) return {
        msg: self.msg.noneViewStore('current', tabId)
      }

      return {
        msg: 'success',
        data: currentVS
      }
    },
    getSpecificVS: function (index, tabId) {
      var self = this
      var tabStore = self.tabsMap[tabId]

      if (!tabStore) return {
        msg: self.msg.noneTabStore(tabId),
        data: null
      }

      var specificVS = tabStore[index]
      if (!specificVS) return {
        msg: self.msg.noneViewStore(index, tabId),
        data: null
      }

      return {
        msg: 'success',
        data: specificVS
      }
    },
  },
  // 管理tabStore viewStore，保证viewStore准确性的方法
  {
    createViewStore: function (tabId) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      chrome.tabs.query({
        active: true
      }, function (tabs) {
        var activeTab = tabs[0]

        if (activeTab && activeTab.id == tabId) {
          // tabStore一定存在，因为 onTabCreated 先于 onBeforeNavigate 触发
          // 这里使用chrom.tabs.query查询activeTab应该可以省略
          var tabStore = self.tabsMap[tabId]

          tabStore.push({
            timeStamp: new Date().toJSON(),
            waiting: false
          })

          defer.resolve(tabStore[tabStore.length - 1])
        }
        else {
          defer.resolve(null)
        }
      })

      return promise
    },

    clearTabStore: function (tabId) {
      var self = this

      delete self.tabsMap[tabId]
    },

    mockTabCreated: function (tabId) {
      var self = this

      var tabStore = self.tabsMap[tabId]

      tabStore.push({
        timeStamp: new Date().toJSON(),
        waiting: true
      })
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

        if (viewStore.waiting) {
          // 无需创建新的viewStore
          viewStore.waiting = false
        }
        else {
          // createViewStore创建一个新的viewStore，并且立即启用（waiting = false）
          self.createViewStore(tabId).then(function (tabViewStore) {
            console.log('Create a new viewStore belongs to tab ' + tabId)
          })
        }
      })
    },

    onTabCreated: function () {
      var self = this

      chrome.tabs.onCreated.addListener(function (tab) {
        /*
         * 只要新打开一个标签页，就需要新建一个tabStore数组
         * 并且初始化一个viewStore
         * waiting = true 表示该viewStore正在等待存储数据
         * waiting = false 表示该viewStore已经开始存储数据
         *  一旦创建新的标签页或者使用chross.navigation.urlChange()
         * 都会创建一个新的viewStore（由onTabCreated或者mockTabCreated完成）
         * 并设置 waiting = true，保证在之后的 onBeforeNavigate 中不再创建新的viewStore
         * 而是直接启用 waiting = true 的viewStore
         * */
        self.tabsMap[tab.id] = new Array({
          timeStamp: new Date().toJSON(),
          waiting: true
        })
      })
    },

    onTabRemoved: function () {
      var self = this

      chrome.tabs.onRemoved.addListener(function (tabId) {
        self.clearTabStore(tabId)
      })
    }
  },
  // Cache 的初始化方法
  {
    init: function () {
      var self = this

      self.onBeforeNavigate()

      self.onTabCreated()

      self.onTabRemoved()
    }
  }
)

module.exports = Cache