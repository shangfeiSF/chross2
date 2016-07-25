module.exports = {
  generateUuid: function () {
    return [+new Date(), '_', Math.floor(Math.random() * 3e10)].join('')
  },

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

  notice: function (output) {
    var notice = {
      type: 'notice',
      output: output
    }

    return notice
  }
}