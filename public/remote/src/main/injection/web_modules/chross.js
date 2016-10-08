var Port = require('port')
var Probe = require('probe')
var Navigation = require('navigation')
var Network = require('network')

function Chross(config) {
  var config = config || {}

  var defaultConfig = {
    crossIframeURL: '//gtms04.alicdn.com/tps/i4/TB1vX.wKVXXXXX7XXXX_RF9JFXX-1-1.gif'
  }

  this.config = $.extend(true, {}, defaultConfig, config)
}

$.extend(Chross.prototype, {
  init: function () {
    var self = this

    self.port = new Port(this)

    self.probe = new Probe(this)

    self.navigation = new Navigation(this)

    self.network = new Network(this)
  }
})

module.exports = Chross