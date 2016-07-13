var Port = require('port')
var Probe = require('probe')

function Chross(config) {
  var config = config || {}

  var defaultConfig = {
    crossIframeURL: '//gtms04.alicdn.com/tps/i4/TB1vX.wKVXXXXX7XXXX_RF9JFXX-1-1.gif'
  }

  this.config = $.extend(defaultConfig, config)
}

$.extend(Chross.prototype, {
  init: function () {
    var self = this

    self.port = new Port(this)

    self.probe = new Probe(this)
  }
})

module.exports = Chross