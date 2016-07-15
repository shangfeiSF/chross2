function Cache(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.tabsMap = {}

  this.chross = chross

  this.init()
}

$.extend(Cache.prototype, {
  set: function (tabId, key, data) {
    var self = this
    var data = data !== undefined ? data : {}

    var tabStore = self.tabsMap[tabId]
    if (!tabStore) {
      return {
        msg: 'Can not set data by tabId ' + tabId,
        data: null
      }
    }

    var activeTabViewStore = tabStore[tabStore.length - 1]
    if (!activeTabViewStore) {
      return {
        msg: 'There is no views of tab ' + tabId,
        data: null
      }
    }

    if (!activeTabViewStore.hasOwnProperty(key)) {
      activeTabViewStore[key] = []
    }
    activeTabViewStore[key].push(data)

    return {
      msg: 'Set data to ' + key + ' belongs to the lastest view of tab ' + tabId,
      data: activeTabViewStore[key]
    }
  },

  exists: function (tabId, key) {
    var self = this

    var tabStore = self.tabsMap[tabId]
    if (!tabStore) {
      return {
        msg: 'Can not check the existence by tabId ' + tabId,
        data: null
      }
    }

    var activeTabViewStore = tabStore[tabStore.length - 1]
    if (!activeTabViewStore) {
      return {
        msg: 'There is no views of tab ' + tabId,
        data: null
      }
    }

    return {
      msg: 'The check result of the existence of ' + key + ' belongs to the lastest view of tab ' + tabId,
      data: activeTabViewStore.hasOwnProperty(key)
    }
  },

  get: function (tabId, key) {
    var self = this

    var tabStore = self.tabsMap[tabId]
    if (!tabStore) {
      return {
        msg: 'Can not get data by tabId ' + tabId,
        data: null
      }
    }

    var activeTabViewStore = tabStore[tabStore.length - 1]
    if (!activeTabViewStore) {
      return {
        msg: 'There is no views of tab ' + tabId,
        data: null
      }
    }

    var result = {
      msg: 'There is no ' + key + ' belongs to the lastest view of tab ' + tabId,
      data: null
    }
    if (activeTabViewStore.hasOwnProperty(key)) {
      result = {
        msg: 'This is the data of ' + key + ' belongs to the lastest view of tab ' + tabId,
        data: activeTabViewStore[key]
      }
    }

    return result
  },

  getAll: function (tabId) {
    var self = this

    var tabStore = self.tabsMap[tabId]
    if (!tabStore) {
      return {
        msg: 'Can not get all data by tabId ' + tabId,
        data: null
      }
    }

    return {
      msg: 'This is the all data belongs to the lastest view of tab ' + tabId,
      data: tabStore
    }
  },

  existsInView: function (tabId, viewIndex, key) {
    var self = this

    var tabStore = self.tabsMap[tabId]
    if (!tabStore) {
      return {
        msg: 'Can not check the existence by tabId ' + tabId,
        data: null
      }
    }

    var activeTabViewStore = tabStore[viewIndex]
    if (!activeTabViewStore) {
      return {
        msg: 'There is no view ranked ' + viewIndex + ' of tab ' + tabId,
        data: null
      }
    }

    return {
      msg: 'The check result of the existence of ' + key + ' belongs to the view ranked' + viewIndex + 'of tab ' + tabId,
      data: activeTabViewStore.hasOwnProperty(key)
    }
  },

  getInView: function (tabId, viewIndex, key) {
    var self = this

    var tabStore = self.tabsMap[tabId]
    if (!tabStore) {
      return {
        msg: 'Can not get data by tabId ' + tabId,
        data: null
      }
    }

    var tabViewStore = tabStore[viewIndex]
    if (!tabViewStore) {
      return {
        msg: 'There is no view ranked ' + viewIndex + ' of tab ' + tabId,
        data: null
      }
    }

    var result = {
      msg: 'There is no ' + key + ' belongs to the view ranked' + viewIndex + ' of tab ' + tabId,
      data: null
    }

    if (tabViewStore.hasOwnProperty(key)) {
      result = {
        msg: 'This is the data of ' + key + ' belongs to the view ranked' + viewIndex + ' of tab ' + tabId,
        data: tabViewStore[key]
      }
    }

    return result
  },

  getAllInView: function (tabId, viewIndex) {
    var self = this

    var tabStore = self.tabsMap[tabId]
    if (!tabStore) {
      return {
        msg: 'Can not get all data by tabId ' + tabId,
        data: null
      }
    }

    var tabViewStore = tabStore[viewIndex]
    if (!tabViewStore) {
      return {
        msg: 'There is no view ranked ' + viewIndex + ' of tab ' + tabId,
        data: null
      }
    }

    return {
      msg: 'This is the all data belongs to the view ranked' + viewIndex + ' of tab ' + tabId,
      data: tabViewStore
    }
  },

  clear: function (tabId) {
    var self = this

    delete self.tabsMap[tabId]
  },

  createNewViewStore: function (tabId) {
    var self = this

    var defer = $.Deferred()
    var promise = defer.promise()

    console.log('createViewStore')
    chrome.tabs.query({
      active: true
    }, function (tabs) {
      console.log('query callback')
      var activeTab = tabs[0]

      if (activeTab && activeTab.id == tabId) {
        // tabStore一定存在，因为 onTabCreated 先于 onBeforeNavigate 触发
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

  mockTabCreated: function (tabId) {
    var self = this

    var tabStore = self.tabsMap[tabId]

    tabStore.push({
      timeStamp: new Date().toJSON(),
      waiting: true
    })
  },

  onBeforeNavigate: function () {
    var self = this

    chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
      if (details.frameId !== 0) return false
      console.log('onBeforeNavigate')
      // 只要改变（包括刷新）已打开的标签页（手动or脚本）
      var tabId = details.tabId
      // tabStore一定存在，因为 onTabCreated 先于 onBeforeNavigate 触发
      var tabStore = self.tabsMap[tabId]
      var viewStore = tabStore[tabStore.length - 1]

      if (viewStore.waiting) {
        // 无需创建新的viewStore
        viewStore.waiting = false
      }
      else {
        // 需要创建一个新的viewStore，并且立即启用（waiting = false）
        self.createNewViewStore(tabId).then(function (tabViewStore) {
          console.log('createViewStore then')
        })
      }
    })
  },

  onTabCreated: function () {
    var self = this

    chrome.tabs.onCreated.addListener(function (tab) {
      console.log('onTabCreated')
      // 只要新打开一个标签页，就需要新建一个tabStore数组
      // 并且初始化一个viewStore
      // waiting = true 表示该viewStore正在等待存储数据
      self.tabsMap[tab.id] = new Array({
        timeStamp: new Date().toJSON(),
        waiting: true
      })
    })
  },

  onTabRemoved: function () {
    var self = this

    chrome.tabs.onRemoved.addListener(function (tabId) {
      self.clear(tabId)
    })
  },

  init: function () {
    var self = this

    self.onBeforeNavigate()

    self.onTabCreated()

    self.onTabRemoved()
  }
})

module.exports = Cache