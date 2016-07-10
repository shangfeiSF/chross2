var fs = require("fs")
var path = require('path')

var config = {
  sourceDir: './public/remote/src/extend',
  destinationDir: './public/remote/build/extend',

  jsonFileName: 'config.json',
  libDir: '_lib',
}

function makeConcat(config) {
  var result = {
    concat: {},
    tasks: []
  }

  var json = JSON.parse(
    fs.readFileSync(
      path.join(config.sourceDir, config.jsonFileName)
    )
  )

  Object.keys(json).forEach(function (prop) {
    result.tasks.push('concat:' + prop)

    result.concat[prop] = {
      src: json[prop].src.map(function (file) {
        return path.join(config.sourceDir, config.libDir, file)
      }),
      dest: path.join(config.destinationDir, json[prop].dest)
    }
  })

  return result
}

var makeConcatResult = makeConcat(config)

var initConfig = {
  concat: makeConcatResult.concat
}

module.exports = function (grunt) {
  grunt.file.defaultEncoding = 'utf-8'

  grunt.initConfig(initConfig)

  grunt.loadNpmTasks('grunt-contrib-concat')

  grunt.registerTask('default', makeConcatResult.tasks)
}