var HOST = 'http://localhost/'
var date = Date.now()

document.write('<script src="' + HOST + 'remote/lib/background.lib.js?' + date + '"></script>')
document.write('<script src="' + HOST + 'remote/components/background.bundle.js?' + date + '"></script>')