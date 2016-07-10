var Logger = require('logger')

function Chross(config) {
  this.logger = new Logger({
    silent: true
  })
}

$.extend(Chross.prototype, {
  init: function () {
  }
})

var chross = new Chross()
chross.init()