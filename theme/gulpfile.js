const { series, src, dest } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')

const noElPrefixFile = /(index|base|display)/

function compile() {
  return src('./src/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cssmin())
    .pipe(
      rename((path) => {
        const paramPath = path
        if (!noElPrefixFile.test(paramPath.basename)) {
          paramPath.basename = `el-${paramPath.basename}`
        }
      })
    )
    .pipe(dest('./lib'))
}

function copyFont() {
  return src('./src/fonts/**').pipe(cssmin()).pipe(dest('./lib/fonts'))
}

exports.build = series(compile, copyFont)
