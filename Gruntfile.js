var cp = require('child_process')

var initConfig = {
  watch: {
    extension: {
      files: ['./public/extension/src/**/*'],
      tasks: ['build.extension']
    },

    remote: {
      files: ['./public/remote/src/**/*'],
      tasks: ['build.remote']
    }
  }
}

module.exports = function (grunt) {
  grunt.file.defaultEncoding = 'utf-8'

  grunt.initConfig(initConfig)

  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('build.extension', function () {
    cp.exec('node cmd/build.extension', {cwd: process.cwd()}, function (error, stdout, stderr) {
      if (error) {
        console.error('exec error:' + error)
      } else {
        console.log(stdout)
        console.log(stderr)
      }
    })
  })

  grunt.registerTask('build.remote', function () {
    cp.exec('node cmd/build.remote', {cwd: process.cwd()}, function (error, stdout, stderr) {
      if (error) {
        console.error('exec error:' + error)
      } else {
        console.log(stdout)
        console.log(stderr)
      }
    })
  })

  grunt.registerTask('default', ['watch'])
}