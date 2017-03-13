var Cache = require('cache')
var Network = require('network')

var existsAPIs = require('./units/existsAPIs')
var filterAPIs = require('./units/filterAPIs')
var getAPIs = require('./units/getAPIs')
var recordAPIs = require('./units/recordAPIs')

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

      var network = new Network({
        cache: cache,
        onlyBoot: true,
        config: {
          crossIframeURL: '//gtms04.alicdn.com/tps/i4/TB1vX.wKVXXXXX7XXXX_RF9JFXX-1-1.gif',
        }
      })

      return network
    },

    test: function () {
      this.existsAPIs()
      this.filterAPIs()
      this.getAPIs()
      this.recordAPIs()
    }
  },
  {
    existsAPIs: existsAPIs,
    filterAPIs: filterAPIs,
    getAPIs: getAPIs,
    recordAPIs: recordAPIs
  }
)

module.exports = Suite