'use strict'

const fs = require('fs')
const gutil = require('gulp-util')
const assert = require('chai').assert
const userscript = require('./')

describe('gulp-userscript', function () {
  describe('in buffer mode', function () {
    it('should correct', function (done) {
      const stream = userscript({
        name: 'test',
        namespace: 'test',
        version: '0.1',
        author: 'Bob',
        match: ['http://www.example.com/*', 'https://www.example.com/*'],
      })
      const file = new gutil.File({
          contents: fs.readFileSync('./test-files/src.js')
      })

      stream.on('data', function (file) {
        fs.writeFileSync('abc.js', file.contents)
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
