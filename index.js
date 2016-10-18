'use strict'

var through = require('through2')
var gutil = require('gulp-util')

var PluginError = gutil.PluginError
var PLUGIN_NAME = 'gulp-userscript'

function getLine(key, value) {
  // For field which has multiple values, like `match`
  if (Array.isArray(value)) {
    return value.map(function (value) {
      return getLine(key, value)
    }).join('')
  }

  return '// @' + key + ' ' + value + '\n'
}

function getMetaPrefix(opt) {
  var meta = Object.keys(opt).map(function (key) {
    return getLine(key, opt[key])
  }).join('')
  return '// ==UserScript==\n' + meta + '// ==/UserScript==\n\n'
}

function userscript(opt) {
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

  var meta = new Buffer(getMetaPrefix(opt))

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

module.exports = userscript
