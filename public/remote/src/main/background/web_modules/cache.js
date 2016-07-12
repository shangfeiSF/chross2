function Cache() {
  this.database = {}

  this.init()
}

$.extend(Cache.prototype, {
  setDataByTabId: function (tabId, key, data) {
    var self = this

    var data = data || {}

    if (!self.database.hasOwnProperty(tabId)) {
      self.database[tabId] = {}
    }
    if (!self.database[tabId].hasOwnProperty(key)) {
      self.database[tabId][key] = []
    }

    self.database[tabId][key].push(data)
  },

  getDataByTabId: function (tabId, key) {
    var self = this

    var result = {
      msg: 'The tab is not found',
      data: null
    }

    var data = self.database[tabId]

    if (data) {
      if (data.hasOwnProperty(key)) {
        result = {
          msg: 'This is the data belongs to Tab#' + tabId,
          data: data[key]
        }
      }
      else {
        result = {
          msg: 'There is no such data belongs to Tab#' + tabId,
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

    var data = self.database[tabId]

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

    delete self.database[tabId]
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