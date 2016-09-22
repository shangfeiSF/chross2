function Loader(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.chross = chross
}

$.extend(Loader.prototype, {
  start: function () {
    var self = this

    var userScriptAjaxConfig = {
      type: 'GET',
      url: 'http://localhost/tasks/userScript.js',
      dataType: 'text'
    }
    var urlsListAjaxConfig = {
      type: "GET",
      url: "http://localhost/tasks/urlsList.json",
      dataType: 'text'
    }

    $.when($.ajax(userScriptAjaxConfig), $.ajax(urlsListAjaxConfig))
      .done(function (userScript, urlsList) {
        var userScript = userScript[1] === 'success' ? userScript[0] : ''
        var urlsList = urlsList[1] === 'success' ? urlsList[0] : {}
        // 更新chross中注册的用户脚本
        self.chross.updateUserScript(userScript)
        // 更新chross中注册的URL列表
        self.chross.updateUrlsList(JSON.parse(urlsList).all)

        chrome.tabs.create({
          url: self.chross.urlsList[0],
          active: true
        }, function (tab) {
          var message = '%cGot UserScript and urlsList'
          console.log(message, 'color: #00ff00; font-weight: bold;')
        })
      })
      .fail(function () {
      })
  }
})

module.exports = Loader