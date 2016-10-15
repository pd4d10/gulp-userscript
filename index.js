const through = require('through2')
const gutil = require('gulp-util')

function isUndefined(val) {
  return val == null
}

function userscript(opt) {
  opt = opt || {}

  if (isUndefined(opt.user)) {
    gutil.throw()
  }

  prefixText = new Buffer(prefixText) // allocate ahead of time

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([prefixText, file.contents])
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(prefixStream(prefixText))
    }

    cb(null, file)
  })
}

module.exports = userscript
