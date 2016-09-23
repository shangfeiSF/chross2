var ignoreUrls = require('ignoreUrls')

function urlFilter(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, defaultConfig, config)

  this.chross = chross

  this.init()
}

$.extend(urlFilter.prototype, {
    ignore: function (config) {
      var config = config || {}
      var result = []
      var urls = ignoreUrls.concat(config.extraIgnoreUrls || [])

      urls.forEach(function (url) {
        var matches = config.url.match(url)

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