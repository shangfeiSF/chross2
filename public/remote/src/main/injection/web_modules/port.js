var commands = require('commands')

function Port(chross) {
  this.ports = {
    top: 'topPort'
  }

  this.chross = chross

  this.commands = Object.keys(commands)

  this.init()
}

$.extend(Port.prototype, {
  monitorTopPort: function () {
    var self = this
    var chross = self.chross

    self.ports.top.onMessage.addListener(function (msg) {
      if (msg.type == 'notice') {
        // notice类型直接打印
        console.log(msg)
      }

      if (msg.type == 'response') {
        // response类型需要传递给对应的模块
        switch (msg.sign.module) {
          case chross.probe.constructor.name:
            chross.probe.resolve(msg)
            break
          case chross.navigation.constructor.name:
            chross.navigation.resolve(msg)
            break
          case chross.network.constructor.name:
            chross.network.resolve(msg)
            break
        }
      }
    })

    self.ports.top.onDisconnect.addListener(function (port) {
    })
  },

  post: function (details) {
    var self = this

    self.ports.top.postMessage(details)
  },

  init: function () {
    var self = this

    // 建立顶层port
    self.ports.top = chrome.runtime.connect({
      name: self.ports.top
    })

    self.monitorTopPort()
  }
})

module.exports = Port