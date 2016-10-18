# gulp-userscript

[![Build Status](https://travis-ci.org/pd4d10/gulp-userscript.svg?branch=master)](https://travis-ci.org/pd4d10/gulp-userscript)
[![codecov](https://codecov.io/gh/pd4d10/gulp-userscript/branch/master/graph/badge.svg)](https://codecov.io/gh/pd4d10/gulp-userscript)
[![npm](https://img.shields.io/npm/v/gulp-userscript.svg)](https://www.npmjs.com/package/gulp-userscript)
[![](https://img.shields.io/npm/l/gulp-userscript.svg)](https://www.npmjs.com/package/gulp-userscript)

Generate Userscript metadata.

## Usage

```js
const gulp = require('gulp')
const userscript = require('gulp-userscript')

gulp.task('userscript', function () {
  return gulp.src('/path/to/src.js')
    .pipe(userscript({
      name: 'Your Userscript name', // required
      namespace: 'namespace',
      version: '0.1',
      'run-at': 'document-end',
      // Use an array when the field has multiple values
      match: [
        'http://www.example.com/*',
        'https://www.example.com/*'
      ],
    }))
    .pipe(gulp.dest('/path/to/dest'))
})
```

will generate Userscript metadata like this:

```js
// ==UserScript==
// @name Your Userscript name
// @namespace namespace
// @version 0.1
// @run-at document-end
// @match http://www.example.com/*
// @match https://www.example.com/*
// ==/UserScript==

// ... /path/to/src.js content here
```

For more options, see https://wiki.greasespot.net/Metadata_Block

## License

MIT
