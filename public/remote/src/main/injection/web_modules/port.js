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
      console.log(self.ports.top.name)
      console.log(msg.type)
      console.log(msg.content)
    })

    self.ports.top.onDisconnect.addListener(function (port) {
    })
  },

  getTopPort: function () {
    var self = this

    return self.ports.top
  },
})

module.exports = Port