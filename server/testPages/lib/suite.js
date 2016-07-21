function Suite(config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)
}

$.extend(Suite.prototype, {
  init: function (create) {
    var self = this

    self.create = create
  }
})