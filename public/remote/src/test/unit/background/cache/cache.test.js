var fs = require('fs')
var path = require('path')

var chai = require('chai')
var colors = require('colors')
var Promise = require("bluebird")

var Cache = require('../../../../main/background/web_modules/cache')

Promise.promisifyAll(fs)
var expect = chai.expect

fs.readdirAsync()
var chross = {}
var cache = new Cache(chross)