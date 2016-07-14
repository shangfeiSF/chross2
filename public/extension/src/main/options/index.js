var head = document.getElementsByTagName('head')[0]

var scriptLib = document.createElement('script')
scriptLib.type = 'text/javascript'
scriptLib.src = 'http://localhost/extend/options.lib.js?' + Date.now()
head.appendChild(scriptLib)

var scriptBundle = document.createElement('script')
scriptBundle.type = 'text/javascript'
scriptBundle.src = 'http://localhost/main/options.bundle.js?' + Date.now()
head.appendChild(scriptBundle)