var fs = require('fs')
var path = require('path')

var express = require('express')
var Promise = require("bluebird")

Promise.promisifyAll(fs)

module.exports = {
  start: function (main) {}
}