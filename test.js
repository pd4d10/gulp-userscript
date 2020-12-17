'use strict'

var fs = require('fs')
var assert = require('assert')
var es = require('event-stream')
var userscript = require('./')

var Vinyl = require('vinyl')
var PluginError = require('plugin-error')

var src = fs.readFileSync('./test-files/src.js').toString()

var testOptions = [
  {
    title: 'should work when value is a string',
    meta: {
      name: 'test',
      version: '0.1'
    },
    dest: fs.readFileSync('./test-files/dest.js').toString(),
  },
  {
    title: 'should work when value is an array',
    meta: {
      name: 'test',
      match: ['http://www.example.com/*', 'https://www.example.com/*'],
    },
    dest: fs.readFileSync('./test-files/dest-with-array.js').toString()
  }
]

describe('gulp-userscript', function () {
  it('should throw error when option is missing', function () {
    assert.throws(
      function () {
        userscript()
      },
      function (err) {
        return err instanceof PluginError && err.message === 'Option is missing'
      }
    )
  })

  it('should throw error when option is not an object', function () {
    assert.throws(
      function () {
        userscript('I am a string')
      },
      function (err) {
        return err instanceof PluginError &&
          err.message === 'Option should be an object'
      }
    )
  })

  it('should throw error when name is missing', function () {
    assert.throws(
      function () {
        userscript({
          version: '0.1'
        })
      },
      function (err) {
        return err instanceof PluginError &&
          err.message === 'Option should have a `name` key'
      }
    )
  })

  describe('in buffer mode', function () {
    testOptions.forEach(function (option) {
      it(option.title, function (done) {
        var stream = userscript(option.meta)

        stream.write(new Vinyl({
          contents: Buffer.from(src)
        }))
        stream.once('data', function (file) {
          assert(file.isBuffer())
          assert.strictEqual(file.contents.toString(), option.dest)
          done()
        })
      })
    })
  })

  describe('in stream mode', function () {
    testOptions.forEach(function (option) {
      it(option.title, function (done) {
        var stream = userscript(option.meta)
        var file = new Vinyl({
          contents: es.readArray([src])
        })

        stream.write(file)
        stream.once('data', function (file) {
          assert(file.isStream())
          file.contents.pipe(es.wait(function (err, data) {
            assert.strictEqual(data.toString(), option.dest)
            done()
          }))
        })
      })
    })
  })
})
