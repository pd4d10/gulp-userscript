'use strict'

var fs = require('fs')
var gutil = require('gulp-util')
var assert = require('chai').assert
var userscript = require('./')

describe('gulp-userscript', function () {
  describe('in buffer mode', function () {
    it('should correct', function (done) {
      var stream = userscript({
        name: 'test',
        namespace: 'test',
        version: '0.1',
        author: 'Bob',
        match: ['http://www.example.com/*', 'https://www.example.com/*'],
      })
      var file = new gutil.File({
          contents: fs.readFileSync('./test-files/src.js')
      })

      stream.on('data', function (file) {
        assert.equal(file.contents.toString(), fs.readFileSync('./test-files/userscript.js').toString())
      })

      stream.on('end', function() {
          done()
      })

      stream.write(file)
      stream.end()
    })
  })

  describe('in stream mode', function () {

  })
})
