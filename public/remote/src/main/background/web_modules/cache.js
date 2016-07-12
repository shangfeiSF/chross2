function Cache() {
  this.database = {}
}

$.extend(Cache.prototype, {
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

  setDataByTabId: function (tabId, data) {
    var self = this

    var data = data || {}

    if (!self.database.hasOwnProperty(tabId)) {
      self.database[tabId] = {}
    }

    $.extend(self.database[tabId], data)
  },

  clearDataByTabId: function (tabId) {
    var self = this

    delete self.database[tabId]
  }
})

module.exports = Cache