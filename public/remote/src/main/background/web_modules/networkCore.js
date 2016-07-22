// tabId 设计为APIs最后一个形参的目的：保证只有形参列表完整时才能正确找到tabStore
module.exports = {
  derivedGroups: [
    'existsAPIs',
    'getAPIs',
    'filterAPIs'
  ],

  groups: {
    recordAPIs: {
      recordInCurrentBVS: function (moments, record, tabId) {
        var self = this
        var details = {}

        moments.forEach(function (moment) {
          self.chross.cache.recordInCurrentBVS(moment, record, tabId)

          details[moment] = self.chross.cache.getInCurrentBVS(moment, tabId)
        })

        return details
      }
    },

    existsAPIs: {
      existsInAllBVS: function (moments, tabId) {
        var self = this
        var exists = {}

        moments.forEach(function (moment) {
          exists[moment] = self.chross.cache.existsInAllBVS(moment, tabId)
        })

        return exists
      },
      existsInCurrentBVS: function (moments, tabId) {
        var self = this
        var exists = {}

        moments.forEach(function (moment) {
          exists[moment] = self.chross.cache.existsInCurrentBVS(moment, tabId)
        })

        return exists
      },
      existsInSpecificBVS: function (moments, index, tabId) {
        var self = this
        var exists = {}

        moments.forEach(function (moment) {
          exists[moment] = self.chross.cache.existsInSpecificBVS(moment, index, tabId)
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