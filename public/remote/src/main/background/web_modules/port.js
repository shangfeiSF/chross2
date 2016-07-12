function Port(chross) {
  this.ports = {}

  this.chross = chross

  this.init()
}

$.extend(Port.prototype, {
  onConnect: function () {
    var self = this

    chrome.runtime.onConnect.addListener(function (port) {
      self.registerPortByTabId(port.sender.tab.id, port)

      self.monitor(port)
    })
  },

  onTabRemoved: function () {
    var self = this

    chrome.tabs.onRemoved.addListener(function (tabId) {
      self.removePortByTabId(tabId)
    })
  },

  monitor: function (port) {
    var self = this

    var port = port

    port.onMessage.addListener(function (msg) {
    })

    port.onDisconnect.addListener(function (port) {
      console.log(self.ports)
    })
  },

  registerPortByTabId: function (tabId, port) {
    var self = this

    self.ports[tabId] = port
  },

  getPortByTabId: function (tabId) {
    var self = this

    if (self.ports.hasOwnProperty(tabId)) {
      return self.ports[tabId]
    }
    else {
      return null
    }
  },

  removePortByTabId: function (tabId) {
    var self = this

    var port = self.ports[tabId]

    if (port) {
      port.disconnect()
      delete  self.ports[tabId]
    }
  },

  init: function () {
    this.onConnect()

    this.onTabRemoved()
  }
})

module.exports = Port