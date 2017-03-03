var fs = require("fs")
var path = require('path')
var child_process = require('child_process')

var gulp = require('gulp')
var watch = require('gulp-watch')
var minimist = require('minimist')

var extension = path.join(__dirname, '../../extension')
var remote = path.join(__dirname, '../../remote')

var cwd = {cwd: path.join(__dirname, '../../')}
var options = minimist(process.argv.slice(2), {
  string: 'host',
  default: {host: 'localhost'}
})

gulp.task('extension', function () {
  return watch(path.join(extension, '/**/*'), function () {
    var cmd = ['node', 'bin/extension.build', '-h', options.host].join(' ')

    child_process.exec(cmd, cwd, function (error, stdout, stderr) {
      if (error) {
        console.error('exec error:' + error)
      } else {
        console.log(stdout)
        console.log(stderr)
      }
    })
  })
})

gulp.task('remote', function () {
  return watch(path.join(remote, '/**/*'), function () {
    var cmd = ['node', 'bin/remote.build', '-h', options.host].join(' ')

    child_process.exec(cmd, cwd, function (error, stdout, stderr) {
      if (error) {
        console.error('exec error:' + error)
      } else {
        console.log(stdout)
        console.log(stderr)
      }
    })
  })
})

gulp.task('default', ['extension', 'remote'])