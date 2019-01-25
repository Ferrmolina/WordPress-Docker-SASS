"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cssnano = require("cssnano");
const eslint = require("gulp-eslint");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

// BrowserSync
function browserSync(done) {
    browsersync.init({
        proxy: "wp.local"
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// CSS task
function css() {
    return gulp
        .src("./theme-base/assets/sass/**/*.scss")
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulp.dest("./theme-base/assets/css/"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(gulp.dest("./theme-base/assets/css/"))
        .pipe(browsersync.stream());
}

// Lint scripts
function scriptsLint() {
    return gulp
        .src(["./theme-base/assets/js/**/*", "./gulpfile.js"])
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

// Transpile, concatenate and minify scripts
function scripts() {
    return (
        gulp
            .src(["./theme-base/assets/js/**/*"])
            .pipe(plumber())
            .pipe(webpackstream(webpackconfig, webpack))
            // folder only, filename is specified in webpack config
            .pipe(gulp.dest("./theme-base/assets/js/"))
            .pipe(browsersync.stream())
    );
}

// Watch files
function watchFiles() {
    gulp.watch("./theme-base/assets/sass/**/*",  css);
    gulp.watch("./theme-base/assets/js/**/*", gulp.series(scriptsLint, scripts));
    gulp.watch("./theme-base/**/*", gulp.series(browserSyncReload));
}

// define complex tasks
const js = gulp.series(scriptsLint, scripts);
const watch = gulp.parallel(watchFiles, browserSync);
const build = gulp.series(gulp.parallel(css, js, watch));

// export tasks
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = build;