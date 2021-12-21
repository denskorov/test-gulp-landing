const {src, dest, watch, series, parallel} = require('gulp')
// const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug')
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');


const appPath = {
    scss: './app/scss/**/*.scss',
    pug: './app/index.pug',
    img: './app/images/**/*.*'
}

const destPath = {
    css: './dest/css',
    html: './dest',
    img: './dest/images'
}

function buildStyles() {
    return src(appPath.scss)
        //TODO: ініціалізація карти
        .pipe(sourcemaps.init())
        .pipe(sass({
            //TODO: параметри для зжимання стилів
            // outputStyle: 'nested'
            // outputStyle: 'compressed'
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
            pretty: true
        }))
        .pipe(dest(destPath.html))
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

function watchCode() {
    watch(appPath.scss, buildStyles)
    watch(appPath.pug, buildHtml)
}

exports.default = series(buildStyles, buildHtml, copyImages, parallel(startLocalServer, watchCode))
