# gulp-userscript

[![Build Status](https://travis-ci.org/pd4d10/gulp-userscript.svg?branch=master)](https://travis-ci.org/pd4d10/gulp-userscript)

Generate UserScript.

## Usage

```js
const gulp = require('gulp')
const userscript = require('gulp-userscript')

gulp.task('userscript', function () {
  return gulp.src('/path/to/src.js')
    .pipe(userscript({
      name: 'Your UserScript name',
      namespace: '',
      version: '',
      match: '',
      include:
      // more options, see https://wiki.greasespot.net/Metadata_Block
    }))
    .pipe(gulp.dest('/dest/folder'))
})
```

## License

MIT
