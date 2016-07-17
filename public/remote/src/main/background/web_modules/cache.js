function Cache(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  // 客户只读
  this.tabsMap = {}

  // 客户可读可写
  this.customerTabsMap = {}

  this.chross = chross

  this.init()
}

// tabId 设计为APIs最后一个形参的目的：保证只有形参列表完整时才能正确找到tabStore
var core = {}
// map(tabId)的全部viewStore、当前viewStore、指定的viewStore中设置key-value型数据
core.setAPIs = {
  setInAllVS: function (map, key, value, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    if (!tabStore.length) return {
      msg: self.msg.noneViewStore('all', tabId),
      data: null
    }

    tabStore.forEach(function (viewStore) {
      viewStore[key] = value
    })

    return {
      msg: 'success',
      data: tabStore
    }
  },
  setInCurrentVS: function (map, key, value, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var currentVS = tabStore[tabStore.length - 1]
    if (!currentVS) return {
      msg: self.msg.noneViewStore('current', tabId)
    }

    currentVS[key] = value

    return {
      msg: 'success',
      data: currentVS
    }
  },
  setInSpecificVS: function (map, key, value, index, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var specificVS = tabStore[index]
    if (!specificVS) return {
      msg: self.msg.noneViewStore(index, tabId),
      data: null
    }

    specificVS[key] = value

    return {
      msg: 'success',
      data: specificVS
    }
  }
}
// map(tabId)的全部viewStore、当前viewStore、指定的viewStore中添加一条记录型数据
core.recordAPIs = {
  recordInAllVS: function (map, library, record, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    if (!tabStore.length) return {
      msg: self.msg.noneViewStore('all', tabId),
      data: null
    }

    tabStore.forEach(function (viewStore) {
      !viewStore.hasOwnProperty(library) && (viewStore[library] = new Array())
      viewStore[library].push(record)
    })

    return {
      msg: 'success',
      data: tabStore
    }
  },
  recordInCurrentVS: function (map, library, record, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var currentVS = tabStore[tabStore.length - 1]
    if (!currentVS) return {
      msg: self.msg.noneViewStore('current', tabId)
    }

    !currentVS.hasOwnProperty(library) && (currentVS[library] = new Array())
    currentVS[library].push(record)

    return {
      msg: 'success',
      data: currentVS
    }
  },
  recordInSpecificVS: function (map, library, record, index, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var specificVS = tabStore[index]
    if (!specificVS) return {
      msg: self.msg.noneViewStore(index, tabId),
      data: null
    }

    !specificVS.hasOwnProperty(library) && (specificVS[library] = new Array())
    specificVS[library].push(record)

    return {
      msg: 'success',
      data: specificVS
    }
  }
}
// map(tabId)的全部viewStore、当前viewStore、指定的viewStore中检查指定属性的存在性
core.existsAPIs = {
  existsInAllVS: function (map, prop, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    if (!tabStore.length) return {
      msg: self.msg.noneViewStore('all', tabId),
      data: null
    }

    var exists = tabStore.map(function (viewStore) {
      return viewStore.hasOwnProperty(prop)
    })

    return {
      msg: 'success',
      data: exists
    }
  },
  existsInCurrentVS: function (map, prop, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var currentVS = tabStore[tabStore.length - 1]
    if (!currentVS) return {
      msg: self.msg.noneViewStore('current', tabId)
    }

    var exists = currentVS.hasOwnProperty(prop)

    return {
      msg: 'success',
      data: exists
    }
  },
  existsInSpecificVS: function (map, prop, index, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var specificVS = tabStore[index]
    if (!specificVS) return {
      msg: self.msg.noneViewStore(index, tabId),
      data: null
    }

    var exists = specificVS.hasOwnProperty(prop)

    return {
      msg: 'success',
      data: exists
    }
  }
}
// map(tabId)的全部viewStore、当前viewStore、指定的viewStore中获取指定的属性值
core.getAPIs = {
  getInAllVS: function (map, key, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    if (!tabStore.length) return {
      msg: self.msg.noneViewStore('all', tabId),
      data: null
    }

    var result = tabStore.map(function (viewStore) {
      if (viewStore.hasOwnProperty(key)) {
        return {
          key: key,
          value: viewStore[key]
        }
      }
      else {
        return {
          key: undefined,
          value: undefined
        }
      }
    })

    return {
      msg: 'success',
      data: result
    }
  },
  getInCurrentVS: function (map, key, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var currentVS = tabStore[tabStore.length - 1]
    if (!currentVS) return {
      msg: self.msg.noneViewStore('current', tabId)
    }

    var result = {
      key: undefined,
      value: undefined
    }
    if (currentVS.hasOwnProperty(key)) {
      result = {
        key: key,
        value: currentVS[key]
      }
    }

    return {
      msg: 'success',
      data: result
    }
  },
  getInSpecificVS: function (map, key, index, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var specificVS = tabStore[index]
    if (!specificVS) return {
      msg: self.msg.noneViewStore(index, tabId),
      data: null
    }

    var result = {
      key: undefined,
      value: undefined
    }
    if (specificVS.hasOwnProperty(key)) {
      result = {
        key: key,
        value: specificVS[key]
      }
    }

    return {
      msg: 'success',
      data: result
    }
  },
}
// map(tabId)的全部viewStore、当前viewStore、指定的viewStore
core.getViewAPIs = {
  getAllVS: function (map, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    if (!tabStore.length) return {
      msg: self.msg.noneViewStore('all', tabId),
      data: null
    }

    return {
      msg: 'success',
      data: tabStore
    }
  },
  getCurrentVS: function (map, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var currentVS = tabStore[tabStore.length - 1]
    if (!currentVS) return {
      msg: self.msg.noneViewStore('current', tabId)
    }

    return {
      msg: 'success',
      data: currentVS
    }
  },
  getSpecificVS: function (map, index, tabId) {
    var self = this
    var map = self[map]
    var tabStore = map[tabId]

    if (!tabStore) return {
      msg: self.msg.noneTabStore(tabId),
      data: null
    }

    var specificVS = tabStore[index]
    if (!specificVS) return {
      msg: self.msg.noneViewStore(index, tabId),
      data: null
    }

    return {
      msg: 'success',
      data: specificVS
    }
  },
}

$.extend(Cache.prototype,
  {
    msg: {
      noneTabStore: function (tabId) {
        return ['Can not find tabStore by tabId=', tabId].join('')
      },
      noneViewStore: function (index, tabId) {
        if (index == 'all') {
          return ['Can not find any viewStores belongs to the tab with tabId=', tabId].join('')
        }
        else if (index == 'current') {
          return ['Can not find the curent viewStore belongs to the tab with tabId=', tabId].join('')
        }
        else {
          return ['Can not find the specific viewStore with index=', index, 'belongs to the tab with tabid=', tabId].join('')
        }
      },
      // noneAttribute暂时没有使用
      noneAttribute: function (attribute, index, tabId) {
        if (index == 'all') {
          return ['Can not find the', attribute, 'attribute in the any viewStores belongs to the tab with tabId=', tabId].join('')
        }
        else if (index == 'current') {
          return ['Can not find the', attribute, 'attribute in the current viewStore belongs to the tab with tabId=', tabId].join('')
        }
        else {
          return ['Can not find the', attribute, 'attribute in the specific viewStore with index=', index, 'belongs to the tab with tabId=', tabId].join('')
        }
      },
    },

    postfixSpec: {
      BVC: 'The viewSotre that admins by background, customer is read-only。',
      CVC: 'The viewStore taht admins by customer himself, customer is readable and writable naturally.'
    }
  },
  core.setAPIs,
  core.recordAPIs,
  core.existsAPIs,
  core.getAPIs,
  core.getViewAPIs,
  // 管理tabStore viewStore，保证viewStore准确性的方法
  {
    inspectActiveTab: function (tabId) {
      var defer = $.Deferred()
      var promise = defer.promise()

      // tabStore一定存在，因为 onTabCreated 先于 onBeforeNavigate 触发
      // 所以这里使用chrom.tabs.query查询activeTab应该可以省略
      // TODO: 有待验证上述猜想
      chrome.tabs.query({active: true}, function (tabs) {
        var activeTab = tabs[0]
        defer.resolve(activeTab && activeTab.id == tabId)
      })

      return promise
    },

    mockTabCreated: function (tabId) {
      var self = this

      self.createViewStore(tabId, true)
    },

    createViewStore: function (tabId, isWaiting) {
      var self = this

      var timeStamp = new Date().toJSON()

      var viewStore = {
        timeStamp: timeStamp
      }
      var customerViewStore = {
        timeStamp: timeStamp
      }

      if (isWaiting) {
        viewStore.waiting = true
        customerViewStore.waiting = true
      }

      self.tabsMap[tabId] = new Array(viewStore)
      self.customerTabsMap[tabId] = new Array(customerViewStore)
    },

    clearTabStore: function (tabId) {
      var self = this

      delete self.tabsMap[tabId]
      delete self.customerTabsMap[tabId]
    }
  },
  // Cache 监听的三个关键时刻：onBeforeNavigate，onTabCreated，onTabRemoved
  {
    onBeforeNavigate: function () {
      var self = this

      chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
        if (details.frameId !== 0) return false
        var tabId = details.tabId

        // tabStore一定存在，因为 onTabCreated 先于 onBeforeNavigate 触发
        var tabStore = self.tabsMap[tabId]
        var viewStore = tabStore[tabStore.length - 1]

        var customerTabStore = self.customerTabsMap[tabId]
        var customerViewStore = customerTabStore[customerTabStore.length - 1]

        self.inspectActiveTab(tabId).then(function (result) {
          if (!result) {
            console.warn('The current Tab is not active tab when init viewStore！！！')
            return false
          }

          if (viewStore.waiting) {
            delete viewStore.waiting
            delete customerViewStore.waiting
          }
          else {
            self.createViewStore(tabId, false)
          }
        })
      })
    },

    onTabCreated: function () {
      var self = this

      chrome.tabs.onCreated.addListener(function (tab) {
        /*
         * 只要新打开一个标签页，就需要新建tabStore数组和customerTabStore数组
         * 并且初始化一个viewStore和一个customerViewStore
         * waiting = true 表示该store正在等待存储数据
         * delete waiting 后将表示该store已经开始存储数据（避免这种类型的私有数据在用户使用时暴露出去）
         *  一旦创建新的标签页或者使用chross.navigation.urlChange()
         * 都会创建一个新的viewStore和一个新的customerViewStore（由onTabCreated或者mockTabCreated完成）
         * 并设置 waiting = true，保证在之后的 onBeforeNavigate 中不再创建新的store
         * 而是直接启用 waiting = true 的viewStore，并 delete waiting
         * */
        self.createViewStore(tab.id, true)
      })
    },

    onTabRemoved: function () {
      var self = this

      chrome.tabs.onRemoved.addListener(function (tabId) {
        self.clearTabStore(tabId)
      })
    }
  },
  // Cache 的初始化方法
  {
    boot: function () {
      var self = this

      Object.keys(core).forEach(function (group) {
        Object.keys(core[group]).forEach(function (coreAPI) {
          var description = coreAPI.match(/\b(\w+)(?=VS\b)/g)

          if (description && description.length == 1) {
            description = description.pop()

            var derivativeAPI = {}
            derivativeAPI[description + 'BVS'] = self[description + 'VS'].bind(self.tabsMap)
            derivativeAPI[description + 'CVS'] = self[description + 'VS'].bind(self.customerTabsMap)

            $.extend(Cache.prototype, derivativeAPI)
          }
        })
      })
    },

    init: function () {
      var self = this

      if (self.boot !== null) {
        self.boot()
        $.extend(Cache.prototype, {
          boot: null
        })
      }

      self.onBeforeNavigate()
      self.onTabCreated()
      self.onTabRemoved()
    }
  }
)

module.exports = Cache