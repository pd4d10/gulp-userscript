'use strict'

var through = require('through2')
var gutil = require('gulp-util')
var PluginError = gutil.PluginError

var PLUGIN_NAME = 'gulp-prefixer'

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText)
  return stream
}

function getKey(k, v) {
  if (typeof v === 'string') {
    return `// @${k} ${v}\n`
  }

  if (Array.isArray(v)) {
    return v.map(x => getKey(k, x)).join('')
  }

  throw new PluginError(PLUGIN_NAME, 'Value type must be string or array.')
}

function getUser(opt) {
  opt = opt || {}
  var x = Object.keys(opt).map(k => getKey(k, opt[k])).join('')
  return '// ==UserScript==\n' + x + '// ==/UserScript==\n\n'
}

function userscript(opt) {
  var userscriptMeta = new Buffer(getUser(opt))

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([userscriptMeta, file.contents])
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(prefixStream(prefixText))
    }

    cb(null, file)
  })
}

module.exports = userscript
