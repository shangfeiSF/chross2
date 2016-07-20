function Suite(config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)
}

$.extend(Suite.prototype, {
  init: function (boot) {
    var self = this

    boot.bind(self)()
  }
})