function Suite(config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)
}