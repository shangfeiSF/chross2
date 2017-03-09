var Cache = require('cache')
var Network = require('network')

$.when(
  $.ajax({
    type: 'GET',
    url: './mock/tabStore.json',
    dataType: 'json'
  }),
  $.ajax({
    type: 'GET',
    url: './mock/userTabStore.json',
    dataType: 'json'
  })
)
  .done(function (data1, data2) {
    // 构造mock数据
    var mockData = {
      tabId: 123,
      tabStore: data1[0].tabStore,
      userTabsMap: data2[0].userTabStore
    }

    // 配置测试套件（模块，数据）
    var suite = new Suite({
      module: Network,  // 传入测试模块
      dependences: {
        Cache: Cache
      },
      mockData: mockData  // 传入测试mock数据
    })

    // 初始化测试套件生成测试模块实例的方法
    suite.init(function () {
      var self = this
      var config = self.config

      var module = config.module
      var dependences = config.dependences
      var mockData = config.mockData

      // mock chross对象
      var _chross = {
        config: {
          crossIframeURL: '//gtms04.alicdn.com/tps/i4/TB1vX.wKVXXXXX7XXXX_RF9JFXX-1-1.gif',
        },
        onlyBoot: true // chross的模块只会执行boot方法初始化APIS
      }

      // 生成测试模块的依赖模块
      _chross.cache = new dependences.Cache({
        onlyBoot: true // chross的模块只会执行boot方法初始化APIS
      })

      // 载入mock数据
      _chross.cache.tabsMap[mockData.tabId] = $.extend(true, {}, mockData.tabStore)
      _chross.cache.userTabsMap[mockData.tabId] = $.extend(true, {}, mockData.userTabsMap)

      // 生成测试模块的实例
      var network = new module(_chross)

      return network
    })

    // 执行测试用例集合
    suite.testRecordAPIs()
    suite.testExistsAPIs()
    suite.testGetAPIs()
    suite.testFilterAPIs()
  })
  .fail(function () {
    alert('请检查本地单元测试服务是否启动！')
  })