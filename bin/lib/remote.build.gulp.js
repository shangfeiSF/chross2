var fs = require("fs")
var path = require('path')

var gulp = require('gulp')
var concat = require('gulp-concat')
var replace = require('gulp-replace')
var minimist = require('minimist')

var remote = path.join(__dirname, '../../remote')
var bundle = path.join(__dirname, '../../_bundle.remote_')

var options = minimist(process.argv.slice(2), {
  string: 'host',
  default: {host: 'localhost'}
})

gulp.task('replaceHost', function () {
  return gulp.src(path.join(bundle, '/**/*'))
    .pipe(replace(/localhost/g, options.host))
    .pipe(gulp.dest(bundle))
})

gulp.task('default', function () {
  var config = JSON.parse(fs.readFileSync(path.join(remote, 'config.json')))

  var tasks = []
  Object.keys(config).forEach(function (key) {
    var task = {
      dest: path.join(bundle, 'lib', config[key].dest)
    }
    task.src = config[key].src.map(function (filename) {
      return path.join(remote, 'lib', filename)
    })
    tasks.push(task)
  })

  tasks.forEach(function (task) {
    gulp.src(task.src)
      .pipe(concat(task.dest))
      .pipe(gulp.dest(bundle))
  })
})