$.when($.ajax({
    type: 'GET',
    url: './data.json',
    dataType: 'json'
  }))
  .done(function (data) {
    var mockData = {
      chross: undefined,
      tabId: 123,
      tabStore: data.tabStore
    }

    var cache = new window.Cache(mockData.chross)
    cache.tabsMap[mockData.tabId] = $.extend({}, mockData.tabStore)

    var suite = new Suite({
      mockData: mockData
    })
    var reset = function () {
      cache.tabsMap[mockData.tabId] = $.extend({}, mockData.tabStore)
    }

    suite.testSetAPIs(cache, reset)

    suite.testRecordAPIs(cache, reset)

    suite.testExiistsAPIs(cache, reset)

    suite.testGetAPIs(cache, reset)

    suite.testGetViewAPIs(cache, reset)
  })
  .fail(function () {
  })