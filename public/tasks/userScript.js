console.info(chross)

var body = $('body')
body.attr('data-test', 'chross')

chross.probe.runCodeInIframe(function () {
  var body = document.getElementsByTagName('body')[0]
  if (body) {
    var imgs = document.querySelectorAll('img')
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute('src', 'http://wwc.alicdn.com/avatar/getAvatar.do?userNick=johnny2008bupt&width=80&height=80&type=sns&_input_charset=UTF-8')
    }
    return 'replace completed!'
  }

}, {
  listener: function (result) {
    console.info(result.frameId, result.data.value)
  }
})

setTimeout(function () {
  chross.navigation.urlChange('http://www.sina.com.cn/')
    .then(function (result) {
      if (result.allow) {
        window.location.href = result.url
      }
    })
}, 10000)