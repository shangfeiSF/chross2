var Cache = require('cache')

var cache = new Cache({})

cache.init()

window.cache = cache