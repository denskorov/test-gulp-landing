const {src, dest, watch, series, parallel} = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug')
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat')
const minify = require('gulp-minify');

const appPath = {
    scss: './app/scss/**/*.scss',
    pug: './app/index.pug',
    js: './app/js/**/*.js',
    img: './app/images/**/*.*',
    fonts: './app/fonts/**/*.*',
}

const destPath = {
    css: './dest/css',
    html: './dest',
    img: './dest/images',
    fonts: './dest/fonts',
    js: './dest/js'
}

const jsPath = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/bootstrap/dist/js/bootstrap.js',
    './app/js/script.js'
]

function buildStyles() {
    return src(appPath.scss)
        //TODO: ініціалізація карти
        .pipe(sourcemaps.init())
        .pipe(sass({
            //TODO: параметри для зжимання стилів
            // outputStyle: 'nested'
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        //TODO: запис карти
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.css))
        .pipe(connect.reload());
}

function buildHtml() {
    return src(appPath.pug)
        .pipe(pug({
            //TODO: параметри для формування HTML
            pretty: false
            // pretty: true
        }))
        .pipe(dest(destPath.html))
        .pipe(connect.reload());
}

function buildJs() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
        }))
        .pipe(sourcemaps.write())
        .pipe(dest(destPath.js))
        .pipe(connect.reload());
}

function startLocalServer() {
    connect.server({
        root: 'dest',
        port: 8080,
        livereload: true
    })
}

function copyImages() {
    return src(appPath.img)
        .pipe(dest(destPath.img))
}

function copyFonts() {
    return src(appPath.fonts)
        .pipe(dest(destPath.fonts))
}

function watchCode() {
    watch(appPath.scss, buildStyles)
    watch(appPath.pug, buildHtml)
    watch(appPath.js, buildJs)
}

exports.default = series(buildStyles, buildHtml, buildJs, copyFonts, copyImages, parallel(startLocalServer, watchCode))
