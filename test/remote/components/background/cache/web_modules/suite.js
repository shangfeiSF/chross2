var Cache = require('cache')

var existsAPIs = require('./units/existsAPIs')
var getAPIs = require('./units/getAPIs')
var getViewAPIS = require('./units/getViewAPIS')
var recordAPIs = require('./units/recordAPIs')
var setAPIs = require('./units/setAPIs')

function Suite(sources) {
  this.sources = sources
  this.mock = null
}

$.extend(Suite.prototype,
  {
    fetch: function (callback) {
      var self = this

      var ajaxes = self.sources.map(function (source) {
        return $.ajax({
          type: 'GET',
          url: './mock/' + source + '.json',
          dataType: 'json'
        })
      })

      $.when.apply($, ajaxes)
        .done(function () {
          callback.apply(self, [null, arguments])
        })
        .fail(function () {
          callback.apply(self, ['Server 500', null])
        })
    },

    beforeHook: function () {
      var mock = this.mock

      var cache = new Cache({
        onlyBoot: true
      })

      cache.tabsMap[mock.tabId] = $.extend(true, {}, mock.tabStore)
      cache.userTabsMap[mock.tabId] = $.extend(true, {}, mock.userTabStore)

      return cache
    },

    test: function () {
      this.existsAPIs()
      this.getAPIs()
      this.getViewAPIS()
      this.recordAPIs()
      this.setAPIs()
    }
  },
  {
    existsAPIs: existsAPIs,
    getAPIs: getAPIs,
    getViewAPIS: getViewAPIS,
    recordAPIs: recordAPIs,
    setAPIs: setAPIs,
  }
)

module.exports = Suite