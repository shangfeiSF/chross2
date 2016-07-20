$.when(
  $.ajax({
    type: 'GET',
    url: './tabStore.json',
    dataType: 'json'
  }),
  $.ajax({
    type: 'GET',
    url: './userTabStore.json',
    dataType: 'json'
  })
  )
  .done(function (data1, data2) {
    // 构造mock数据
    var mockData = {
      chross: undefined,  // 避免chross的模块调用chross的方法
      tabId: 123,
      tabStore: data1[0].tabStore,
      userTabsMap: data2[0].userTabStore
    }

    // 配置测试套件（模块，数据）
    var suite = new Suite({
      module: window.Cache,  // 传入测试模块
      mockData: mockData  // 传入测试mock数据
    })

    // 初始化测试套件
    suite.init(function () {
      var self = this

      var config = self.config
      var mockData = config.mockData
      var tabId = mockData.tabId

      // 生成测试模块的实例
      self.cache = new config.module(mockData.chross)
      // 载入mock数据
      self.cache.tabsMap[tabId] = $.extend({}, mockData.tabStore)
      self.cache.userTabsMap[tabId] = $.extend({}, mockData.userTabsMap)

      // 配置单元测试辅助方法
      this.reset = function () {
        var self = this

        var config = self.config
        var mockData = config.mockData
        var tabId = mockData.tabId

        self.cache.tabsMap[tabId] = $.extend({}, mockData.tabStore)
        self.cache.userTabsMap[tabId] = $.extend({}, mockData.userTabsMap)
      }
    })

    // 执行测试用例集合
    suite.testSetAPIs_BVS()
    suite.testSetAPIs_UVS()

    suite.testRecordAPIs_BVS()
    suite.testRecordAPIs_UVS()

    suite.testExiistsAPIs_BVS()
    suite.testExiistsAPIs_UVS()

    suite.testGetAPIs_BVS()
    suite.testGetAPIs_UVS()

    suite.testGetViewAPIs_BVS()
    suite.testGetViewAPIs_UVS()
  })
  .fail(function () {
    alert('请检查本地单元测试服务是否启动！')
  })