var message = require('message')

function Probe(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, {}, defaultConfig, config)

  this.listenerInfosMap = {}

  this.chross = chross

  this.init()
}

$.extend(Probe.prototype,
  // chross.probe模块提供的API
  {
    /*
     * 以injection中的chross.probe.runCodeInIframe为例阐述整个流程：
     * 1. 在runCodeInIframe的listenerInfosMap中注册监听器listener
     * 2. 注册监听器listener时，分配本次API调用的uuid，生成签名sign（包括uuid和API所属模块名称module）
     * 3. 向background发送必选的签名sign和命令command，以及可选的params, data
     * 4. 在background的port中经过monitor方法处理后，注入代码到全部iframe
     * 5. 在background的probe中经过monitorCrossIframeUrl处理后，发送到injection的port中monitorTopPort处理
     * 6. 按照所属模块名称sign.module分配到API所属模块的resolve方法解析
     * 7. 在resolve方法中，通过uuid匹配listenerInfosMap中注册监听器listener，并执行listener
     * */
    runCodeInIframe: function (code, config) {
      var self = this
      var port = self.chross.port

      // 因为存在多个iframe的可能性，所以无法使用promise来做回调
      var listener = function () {
      }

      if (config) {
        if ($.isFunction(config.listener)) {
          listener = config.listener
        }
        else if ($.isFunction(config)) {
          listener = config
        }
      }

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'runCodeInIframe',
            params: {
              /*
               * params中需要携带签名sign！！
               * 因为注入代码动作的回调中只是确定脚本已经注入
               * 只有当注入代码执行后才会将结果发送给注入injection
               * */
              sign: sign,
              code: code.toString()
            }
          })
        })
    }
  },
  {
    resolve: function (msg) {
      var self = this
      var uuid = msg.sign.uuid

      if (self.listenerInfosMap.hasOwnProperty(uuid)) {
        self.listenerInfosMap[uuid](msg)
      } else {
        console.error('Can not resolve!')
      }
    },

    register: function (listener) {
      var self = this
      var uuid = message.generateUuid()

      var defer = $.Deferred()
      var promise = defer.promise()

      self.listenerInfosMap[uuid] = listener

      defer.resolve({
        module: self.constructor.name,
        uuid: uuid
      })

      return promise
    },

    init: function () {
    }
  }
)

module.exports = Probe
