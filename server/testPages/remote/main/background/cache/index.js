$.when($.ajax({
    type: 'GET',
    url: './data.json',
    dataType: 'json'
  }))
  .done(function (data) {
    var mockData = {
      chross: undefined,
      tabId: 123,
      tabStore: data.tabStore,
      userTabsMap: {
        timeStamp: new Date().toJSON(),
        viewStores: [
          {
            userName: 'shangfei',
            userType: ['admin', 'developer'],
            userId: 73812,
            userInfo: {
              floor: 17,
              seat: 158,
              tel: ''
            },
            timeStamp: new Date().toJSON(),
          },
          {
            userName: 'xiaoshao',
            userType: ['guest', 'developer'],
            timeStamp: new Date().toJSON(),
          },
          {
            userId: null,
            userInfo: {
              tel: ''
            },
            timeStamp: new Date().toJSON(),
          },
          {
            userName: '',
            userId: null,
            timeStamp: new Date().toJSON(),
          },
          {
            userInfo: {
              tel: '18612697399'
            },
            timeStamp: new Date().toJSON(),
          },
        ]
      }
    }

    var cache = new window.Cache(mockData.chross)
    cache.tabsMap[mockData.tabId] = $.extend({}, mockData.tabStore)
    cache.userTabsMap[mockData.tabId] = $.extend({}, mockData.userTabsMap)

    var suite = new Suite({
      mockData: mockData
    })
    var reset = function () {
      cache.tabsMap[mockData.tabId] = $.extend({}, mockData.tabStore)
      cache.userTabsMap[mockData.tabId] = $.extend({}, mockData.userTabsMap)
    }

    suite.testSetAPIs_BVS(cache, reset)
    suite.testSetAPIs_UVS(cache, reset)

    suite.testRecordAPIs_BVS(cache, reset)
    suite.testRecordAPIs_UVS(cache, reset)

    suite.testExiistsAPIs_BVS(cache, reset)
    suite.testExiistsAPIs_UVS(cache, reset)

    suite.testGetAPIs_BVS(cache, reset)
    suite.testGetAPIs_UVS(cache, reset)

    suite.testGetViewAPIs_BVS(cache, reset)
    suite.testGetViewAPIs_UVS(cache, reset)
  })
  .fail(function () {
  })