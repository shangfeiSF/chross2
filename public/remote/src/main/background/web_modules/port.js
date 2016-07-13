function Port(chross) {
  this.ports = {}

  this.chross = chross

  this.init()
}

$.extend(Port.prototype, {
  monitor: function (port) {
    var self = this

    var port = port

    port.onMessage.addListener(function (msg) {
      var cmd = msg.cmd
      var data = msg.data

      console.log(msg)

      var handler = self.chross.agent.handler

      var action = self.chross.agent.findAction(cmd)

      if (action !== undefined) {
        handler[action](data, port.sender)
          .then(function () {
            port.postMessage({
              type: 'private',
              content: 'Inject code to all iframes'
            })
          })
      }
      else {
        port.postMessage({
          type: 'private',
          content: 'invalid command:' + cmd
        })
      }
    })

    // 页面刷新 & 页面关闭 都会自动触发 port.disconnect()
    // 页面刷新后触发 onBeforeNavigate 删除该tabId下的port
    // 页面关闭后触发 onTabRemoved 删除该tabId下的port
    port.onDisconnect.addListener(function (port) {
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
      delete  self.ports[tabId]
    }
  },

  onConnect: function () {
    var self = this

    chrome.runtime.onConnect.addListener(function (port) {
      self.registerPortByTabId(port.sender.tab.id, port)

      self.monitor(port)
    })
  },

  onBeforeNavigate: function () {
    var self = this

    chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
      if (details.frameId !== 0) return false

      self.removePortByTabId(details.tabId)
    })
  },

  onTabRemoved: function () {
    var self = this

    chrome.tabs.onRemoved.addListener(function (tabId) {
      self.removePortByTabId(tabId)
    })
  },

  init: function () {
    var self = this

    self.onConnect()

    self.onBeforeNavigate()

    self.onTabRemoved()
  }
})

module.exports = Port