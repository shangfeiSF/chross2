chross.probe.runCodeInIframe(function () {
  var body = document.getElementsByTagName('body')[0]
  if (body) {
    var imgs = document.querySelectorAll('img')
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute('src', 'http://wwc.alicdn.com/avatar/getAvatar.do?userNick=johnny2008bupt&width=80&height=80&type=sns&_input_charset=UTF-8')
    }
    return {
      tip: 'replace completed!'
    }
  }
}, {
  listener: function (result) {
    // console.log(result)
  }
})

chross.network.existsInAllViews(['onBeforeRequest']).then(function (result) {
  console.log(result)
})
chross.network.existsInCurrentView(['onBeforeSendHeaders']).then(function (result) {
  console.log(result)
})
chross.network.existsInSpecificView(['onHeadersReceived'], 2).then(function (result) {
  console.log(result)
})

chross.network.getInAllViews(['onBeforeRequest']).then(function (result) {
  console.warn(result)
})
chross.network.getInCurrentView(['onBeforeSendHeaders']).then(function (result) {
  console.warn(result)
})
chross.network.getInSpecificView(['onHeadersReceived'], 2).then(function (result) {
  console.warn(result)
})

chross.network.filterInAllViews(['onBeforeRequest'], 'http://localhost/entry.html').then(function (result) {
  console.info(result)
})
chross.network.filterInCurrentView(['onBeforeRequest'], 'http://localhost/entry.html').then(function (result) {
  console.info(result)
})
chross.network.filterInSpecificView(['onBeforeRequest'], 'http://localhost/entry.html', 2).then(function (result) {
  console.info(result)
})

setTimeout(function () {
  chross.navigation.urlChange('http://localhost/entry.html')
    .then(function (result) {
      // console.info(result)
      // window.location.href = 'http://localhost/entry.html'
    })
}, 5000)