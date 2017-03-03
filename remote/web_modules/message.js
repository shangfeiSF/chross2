module.exports = {
  // 为injection.port、injection.probe、injection.navigation 提供 generateUuid
  generateUuid: function () {
    return [+new Date(), '_', Math.floor(Math.random() * 3e10)].join('')
  },

  // 为background.port、background.probe提供response类型消息
  response: function (msg, output) {
    var resopnse = {
      sign: msg.sign,
      type: 'response',
      input: {
        command: msg.command,
        params: msg.params,
        data: msg.data
      }
    }

    if (output) {
      resopnse.output = output
    }
    else {
      resopnse.error = {
        code: 404,
        spec: 'Invaild Command'
      }
    }

    return resopnse
  },

  // 为background.navigation提供notice类型消息
  notice: function (output) {
    var notice = {
      type: 'notice',
      output: output
    }

    return notice
  }
}