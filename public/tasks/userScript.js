var probe = chross.probe
var network = chross.network
var alias = network.alias

var focusURL = 'http://localhost/.*.html'
var focusViewIndex = 2

probe.runCodeInIframe(
  function () {
    var body = document.getElementsByTagName('body')[0]
    if (body) {
      var imgs = document.querySelectorAll('img')
      for (var i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute('src', 'https://wwc.alicdn.com/avatar/getAvatar.do?userNick=johnny2008bupt&width=80&height=80&type=sns&_input_charset=UTF-8')
      }
      return {
        tip: 'replace completed!'
      }
    }
  },
  {
    listener: function (result) {
      //  console.log(result.output.value)
    }
  }
)

$.when(
  network.existsInAllViews([alias.brq]),
  network.existsInCurrentView([alias.bsh]),
  network.existsInSpecificView([alias.hr], focusViewIndex),

  network.getInAllViews([alias.brq]),
  network.getInCurrentView([alias.bsh]),
  network.getInSpecificView([alias.hr], focusViewIndex),

  network.filterInAllViews([alias.brq], focusURL),
  network.filterInCurrentView([alias.bsh], focusURL),
  network.filterInSpecificView([alias.hr], focusURL, focusViewIndex)
).then(function (aexists, cexists, sexists, aget, cget, sget, afilter, cfilter, sfilter) {
  console.info(aexists)
  console.info(cexists)
  console.info(sexists)

  console.warn(aget)
  console.warn(cget)
  console.warn(sget)

  console.log(afilter)
  console.log(cfilter)
  console.log(sfilter)
})

setTimeout(function () {
  chross.navigation.urlChange('https://www.baidu.com/')
    .then(function (result) {
      window.location.href = 'https://www.baidu.com/'
    })
}, 4000)