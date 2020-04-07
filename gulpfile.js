const gulp = require('gulp');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('concat', function() {
    return gulp.src('./source/js/**/*.js')
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
});

var vendorjs = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/vue/dist/vue.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'
]

gulp.task('vendor', function() {
    return gulp.src(vendorjs)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('pug', function buildHTML() {
    return gulp.src('./source/**/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/html'))
});

gulp.task('sass', function() {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('watch', function() {
    gulp.watch('./source/js/**/*.js', gulp.series('concat'));
    gulp.watch('./source/**/*.pug', gulp.series('pug'));
    gulp.watch('./source/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('concat', 'pug', 'vendor', 'sass', 'watch'));