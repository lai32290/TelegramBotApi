'use strict';

const gulp = require('gulp')
    , mocha = require('gulp-mocha');

gulp.task('default', function () {
    gulp.start(['mocha', 'watch']);
});

gulp.task('watch', function () {
    gulp.watch(['test/*.js', 'telegramBotApi.js'])
        .on('change', () => {
            gulp.start('mocha');
        });
});

gulp.task('mocha', () => {
    return gulp.src('test/*.js', {read: false})
        .pipe(mocha());
});