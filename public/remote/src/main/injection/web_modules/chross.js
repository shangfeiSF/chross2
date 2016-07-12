var Port = require('port')

function Chross(config) {
}

$.extend(Chross.prototype, {
  init: function () {
    var self = this

    self.port = new Port(this)
  },

  post: function (cmd, data) {
    var self = this

    var topPort = self.port.getTopPort()

    topPort.postMessage({
      cmd: cmd,
      data: data
    })
  }
})

module.exports = Chross