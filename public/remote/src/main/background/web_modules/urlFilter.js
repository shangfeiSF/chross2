var ignoreUrls = require('ignoreUrls')

function urlFilter(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, {}, defaultConfig, config)

  this.chross = chross

  this.init()
}

$.extend(urlFilter.prototype, {
    ignore: function (config) {
      var result = []

      var config = config || {}
      var url = config.url || ''
      var extraIgnoreUrls = config.extraIgnoreUrls || []

      ignoreUrls.concat(extraIgnoreUrls).forEach(function (ignoreUrl) {
        var matches = url.match(ignoreUrl)

        if (matches && matches.length) {
          result.push(matches)
        }
      })

      return result
    },

    init: function () {
    }
  }
)

module.exports = urlFilter