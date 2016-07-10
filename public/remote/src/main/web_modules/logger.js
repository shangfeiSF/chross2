function Logger(config) {
  this.defaultConfig = {
    silent: true
  }

  this.config = $.extend(this.defaultConfig, config || {})
}

$.extend(Logger.prototype, {
  force: function () {
    console.log.apply(console, arguments)
  },

  normal: function () {
    var self = this
    !self.config.silent && console.log.apply(console, arguments)
  }
})

module.exports = Logger