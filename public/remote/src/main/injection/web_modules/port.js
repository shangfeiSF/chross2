function Port(chross) {
  this.ports = {
    top: 'topPort'
  }

  this.chross = chross

  this.init()
}

$.extend(Port.prototype, {
  init: function () {
    var self = this

    self.ports.top = chrome.runtime.connect({
      name: self.ports.top
    })

    self.monitorTopPort()
  },

  monitorTopPort: function () {
    var self = this

    self.ports.top.onMessage.addListener(function (msg) {
      if (msg.uuid) return false
      console.log(msg)
    })

    self.ports.top.onDisconnect.addListener(function (port) {
    })
  },

  getTopPort: function () {
    var self = this

    return self.ports.top
  },

  post: function (command, data) {
    var self = this

    self.getTopPort().postMessage({
      cmd: command,
      data: data
    })
  }
})

module.exports = Port