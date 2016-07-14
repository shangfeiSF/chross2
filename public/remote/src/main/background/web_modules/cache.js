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

  createViewStore: function (tabId) {
    var self = this

    var defer = $.Deferred()
    var promise = defer.promise()

    chrome.tabs.query({
      active: true
    }, function (tabs) {
      var activeTab = tabs[0]

      if (activeTab && activeTab.id == tabId) {
        var tabStore = self.tabsMap[tabId]
        var timeStamp = new Date().toJSON()

        if (tabStore === undefined) {
          self.tabsMap[tabId] = new Array({
            timeStamp: timeStamp
          })
        }
        else {
          tabStore.push({
            timeStamp: timeStamp
          })
        }

        defer.resolve(tabStore[tabStore.length - 1])
      }
      else {
        defer.resolve(null)
      }
    })

    return promise
  },

  onBeforeNavigate: function () {
    var self = this

    chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
      if (details.frameId !== 0) return false

      self.createViewStore(details.tabId).then(function (tabViewStore) {
        if (tabViewStore !== null) {
          console.log(self.chross.cache.tabsMap[details.tabId])
        }
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

    self.onTabRemoved()
  }
})

module.exports = Cache