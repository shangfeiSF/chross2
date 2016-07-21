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
      chross: {
        config: {
          crossIframeURL: '//gtms04.alicdn.com/tps/i4/TB1vX.wKVXXXXX7XXXX_RF9JFXX-1-1.gif',
        },
        onlyBoot: true // chross的模块只会执行boot方法初始化APIS
      },
      tabId: 123,
      tabStore: data1[0].tabStore,
      userTabsMap: data2[0].userTabStore
    }

    // 配置测试套件（模块，数据）
    var suite = new Suite({
      module: window.Network,  // 传入测试模块
      mockData: mockData  // 传入测试mock数据
    })

    // 初始化测试套件
    suite.init(function () {
      var self = this

      var config = self.config
      var tabId = config.mockData.tabId

      // 复制mock数据
      var mockData = $.extend(true, {}, config.mockData)

      // 生成测试模块依赖的模块
      mockData.chross.cache = new window.Cache(undefined)  // chross的模块只会执行boot方法初始化APIS
      // 载入mock数据
      mockData.chross.cache.tabsMap[tabId] = $.extend(true, {}, mockData.tabStore)
      mockData.chross.cache.userTabsMap[tabId] = $.extend(true, {}, mockData.userTabsMap)

      // 生成测试模块的实例
      self.network = new config.module(mockData.chross)

      // 配置单元测试辅助方法
      this.reset = function () {
        var self = this
        var config = self.config
        var tabId = config.mockData.tabId

        // 复制mock数据
        var mockData = $.extend(true, {}, config.mockData)

        // 生成测试模块的实例
        self.network.chross.cache = new window.Cache(undefined)  // chross的模块只会执行boot方法初始化APIS

        // 载入mock数据
        self.network.chross.cache.tabsMap[tabId] = $.extend(true, {}, mockData.tabStore)
        self.network.chross.cache.userTabsMap[tabId] = $.extend(true, {}, mockData.userTabsMap)
        console.log('重置完成')
      }
    })

    // 执行测试用例集合
    suite.testRecordAPIs()

    suite.testExistsAPIs()
  })
  .fail(function () {
    alert('请检查本地单元测试服务是否启动！')
  })