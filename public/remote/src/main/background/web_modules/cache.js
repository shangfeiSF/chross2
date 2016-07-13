function Cache() {
  this.tabsMap = {}

  this.init()
}

$.extend(Cache.prototype, {
  setDataByTabId: function (tabId, key, data) {
    var self = this

    var data = data !== undefined ? data : {}

    if (!self.tabsMap.hasOwnProperty(tabId)) {
      self.tabsMap[tabId] = {}
    }
    if (!self.tabsMap[tabId].hasOwnProperty(key)) {
      self.tabsMap[tabId][key] = []
    }

    self.tabsMap[tabId][key].push(data)
  },

  getDataByTabId: function (tabId, key) {
    var self = this

    var result = {
      msg: 'The tab is not found',
      type: '404',
      data: null
    }

    var data = self.tabsMap[tabId]

    if (data) {
      if (data.hasOwnProperty(key)) {
        result = {
          msg: 'This is the data belongs to Tab#' + tabId,
          type: '200',
          data: data[key]
        }
      }
      else {
        result = {
          msg: 'There is no such data belongs to Tab#' + tabId,
          type: '405',
          data: null
        }
      }
    }

    return result
  },

  getAllDataByTabId: function (tabId) {
    var self = this

    var result = {
      msg: 'The tab is not found',
      data: null
    }

    var data = self.tabsMap[tabId]

    if (data) {
      result = {
        msg: 'This is all data belongs to Tab#' + tabId,
        data: data
      }
    }

    return result
  },

  clearDataByTabId: function (tabId) {
    var self = this

    delete self.tabsMap[tabId]
  },

  onBeforeNavigate: function () {
    var self = this

    chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
      if (details.frameId !== 0) return false

      self.clearDataByTabId(details.tabId)
    })
  },

  onTabRemoved: function () {
    var self = this

    chrome.tabs.onRemoved.addListener(function (tabId) {
      self.clearDataByTabId(tabId)
    })
  },

  init: function () {
    var self = this

    self.onBeforeNavigate()

    self.onTabRemoved()
  }
})

module.exports = Cache