var HOST = 'http://localhost/'
var date = Date.now()

var scriptLib = document.createElement('script')
scriptLib.type = 'text/javascript'
scriptLib.src = HOST + 'remote/lib/options.lib.js?' + date

var scriptBundle = document.createElement('script')
scriptBundle.type = 'text/javascript'
scriptBundle.src = HOST + 'remote/components/options.bundle.js?' + date

var head = document.getElementsByTagName('head')[0]
head.appendChild(scriptLib)
head.appendChild(scriptBundle)