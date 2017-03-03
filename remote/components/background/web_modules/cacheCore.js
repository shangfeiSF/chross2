// tabId 设计为APIs最后一个形参的目的：保证只有形参列表完整时才能正确找到tabStore
module.exports = {
  // derivedGroups列出需要衍生的API-group，在cache.boot方法中使用
  derivedGroups: [
    'setAPIs',
    'recordAPIs',
    'existsAPIs',
    'getAPIs',
    'getViewAPIs'
  ],

  /*
   * 全部API的map参数会在cache.boot()方法中bind，取值tabsMap或者userTabsMap
   * 全部API返回{ msg: …… , data: …… }
   * */
  groups: {
    // 在map(tabId)的allViewStores、currentViewStore、specificViewStore中
    // 设置key-value型数据
    setAPIs: {
      setInAllVS: function (map, key, value, tabId) {
        var self = this
        var map = self[map]
        var tabStore = map[tabId]

        if (!tabStore) return {
          msg: self.msg.noneTabStore(tabId),
          data: null
        }

        if (!tabStore.viewStores.length) return {
          msg: self.msg.noneViewStore('all', tabId),
          data: null
        }

        tabStore.viewStores.forEach(function (viewStore) {
          viewStore[key] = value
        })

        return {
          msg: 'success',
          data: tabStore.viewStores
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

        var currentVS = tabStore.viewStores[tabStore.viewStores.length - 1]
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

        var specificVS = tabStore.viewStores[index]
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
    },
    // 在map(tabId)的allViewStores、currentViewStore、specificViewStore中
    // 添加一条记录型数据
    recordAPIs: {
      recordInAllVS: function (map, library, record, tabId) {
        var self = this
        var map = self[map]
        var tabStore = map[tabId]

        if (!tabStore) return {
          msg: self.msg.noneTabStore(tabId),
          data: null
        }

        if (!tabStore.viewStores.length) return {
          msg: self.msg.noneViewStore('all', tabId),
          data: null
        }

        tabStore.viewStores.forEach(function (viewStore) {
          !viewStore.hasOwnProperty(library) && (viewStore[library] = new Array())
          viewStore[library].push(record)
        })

        return {
          msg: 'success',
          data: tabStore.viewStores
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

        var currentVS = tabStore.viewStores[tabStore.viewStores.length - 1]
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

        var specificVS = tabStore.viewStores[index]
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
    },
    // 在map(tabId)的allViewStores、currentViewStore、specificViewStore中
    // 检查指定属性prop的存在性
    existsAPIs: {
      existsInAllVS: function (map, prop, tabId) {
        var self = this
        var map = self[map]
        var tabStore = map[tabId]

        if (!tabStore) return {
          msg: self.msg.noneTabStore(tabId),
          data: null
        }

        if (!tabStore.viewStores.length) return {
          msg: self.msg.noneViewStore('all', tabId),
          data: null
        }

        var exists = tabStore.viewStores.map(function (viewStore) {
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

        var currentVS = tabStore.viewStores[tabStore.viewStores.length - 1]
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

        var specificVS = tabStore.viewStores[index]
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
    },
    // 在map(tabId)的allViewStores、currentViewStore、specificViewStore中
    // 获取指定属性key的值
    getAPIs: {
      getInAllVS: function (map, key, tabId) {
        var self = this
        var map = self[map]
        var tabStore = map[tabId]

        if (!tabStore) return {
          msg: self.msg.noneTabStore(tabId),
          data: null
        }

        if (!tabStore.viewStores.length) return {
          msg: self.msg.noneViewStore('all', tabId),
          data: null
        }

        var result = tabStore.viewStores.map(function (viewStore) {
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

        var currentVS = tabStore.viewStores[tabStore.viewStores.length - 1]
        if (!currentVS) return {
          msg: self.msg.noneViewStore('current', tabId),
          data: null
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

        var specificVS = tabStore.viewStores[index]
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
    },
    // 获取map(tabId)的allViewStores、currentViewStore、specificViewStore
    getViewAPIs: {
      getAllVS: function (map, tabId) {
        var self = this
        var map = self[map]
        var tabStore = map[tabId]

        if (!tabStore) return {
          msg: self.msg.noneTabStore(tabId),
          data: null
        }

        if (!tabStore.viewStores.length) return {
          msg: self.msg.noneViewStore('all', tabId),
          data: null
        }

        return {
          msg: 'success',
          data: tabStore.viewStores
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

        var currentVS = tabStore.viewStores[tabStore.viewStores.length - 1]
        if (!currentVS) return {
          msg: self.msg.noneViewStore('current', tabId),
          data: null
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

        var specificVS = tabStore.viewStores[index]
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
  }
}