// tabId 设计为APIs最后一个形参的目的：保证只有形参列表完整时才能正确找到tabStore
module.exports = {
  derivedGroups: [
    'existsAPIs',
    'getAPIs',
    'filterAPIs'
  ],

  groups: {
    recordAPIs: {
      recordInCurrentBVS: function (moment, record, tabId) {
        var self = this

        self.chross.cache.recordInCurrentBVS(moment, record, tabId)

        return self.chross.cache.getInCurrentBVS(moment, tabId)
      }
    },

    existsAPIs: {
      existsInAllBVS: function (moments, tabId) {
        var self = this
        var exists = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.existsInAllBVS(moment, tabId)
          exists[moment] = result.data !== null ? result.data : result.msg
        })

        return exists
      },
      existsInCurrentBVS: function (moments, tabId) {
        var self = this
        var exists = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.existsInCurrentBVS(moment, tabId)
          exists[moment] = result.data !== null ? result.data : result.msg
        })

        return exists
      },
      existsInSpecificBVS: function (moments, index, tabId) {
        var self = this
        var exists = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.existsInSpecificBVS(moment, index, tabId)
          exists[moment] = result.data !== null ? result.data : result.msg
        })

        return exists
      }
    },

    getAPIs: {
      getInAllBVS: function (moments, tabId) {
        var self = this
        var details = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.getInAllBVS(moment, tabId)
          details[moment] = result.data
        })

        return details
      },
      getInCurrentBVS: function (moments, tabId) {
        var self = this
        var details = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.getInCurrentBVS(moment, tabId)
          details[moment] = result.data
        })

        return details
      },
      getInSpecificBVS: function (moments, index, tabId) {
        var self = this
        var details = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.getInSpecificBVS(moment, index, tabId)
          details[moment] = result.data
        })

        return details
      }
    },

    filterAPIs: {
      filterInAllBVS: function (moments, pattern, tabId) {
        var self = this
        var pattern = new RegExp(pattern)
        var details = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.getInAllBVS(moment, tabId).data

          details[moment] = result.map(function (item) {
            if (item.key === undefined) {
              return item
            }
            else {
              return {
                key: item.key,
                value: item.value.filter(function (value) {
                  return pattern.exec(value.url) !== null
                })
              }
            }
          })
        })

        return details
      },
      filterInCurrentBVS: function (moments, pattern, tabId) {
        var self = this
        var pattern = new RegExp(pattern)
        var details = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.getInCurrentBVS(moment, tabId).data

          details[moment] = result.key === undefined ? result : {
            key: result.key,
            value: result.value.filter(function (request) {
              return pattern.exec(request.url) !== null
            })
          }
        })

        return details
      },
      filterInSpecificBVS: function (moments, pattern, index, tabId) {
        var self = this
        var pattern = new RegExp(pattern)
        var details = {}

        moments.forEach(function (moment) {
          var result = self.chross.cache.getInSpecificBVS(moment, index, tabId).data

          details[moment] = result.key === undefined ? result : {
            key: result.key,
            value: result.value.filter(function (request) {
              return pattern.exec(request.url) !== null
            })
          }
        })

        return details
      }
    }
  }
}