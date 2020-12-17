'use strict'

var through = require('through2')
var gutil = require('gulp-util')
var userscript = require('userscript-meta')

var PluginError = gutil.PluginError
var PLUGIN_NAME = 'gulp-userscript'

module.exports = function (opt) {
  if (opt == null) {
    throw new PluginError(PLUGIN_NAME, 'Option is missing')
  }

  if (typeof opt !== 'object') {
    throw new PluginError(PLUGIN_NAME, 'Option should be an object')
  }

  // name is required
  if (!opt.name) {
    throw new PluginError(PLUGIN_NAME, 'Option should have a `name` key')
  }

  var meta = Buffer.from(userscript.stringify(opt) + '\n')

  return through.obj(function (file, enc, cb) {
    if (file.isBuffer()) {
      file.contents = Buffer.concat([meta, file.contents])
    }

    if (file.isStream()) {
      var stream = through()
      stream.write(meta)
      file.contents = file.contents.pipe(stream)
    }

    cb(null, file)
  })
}
