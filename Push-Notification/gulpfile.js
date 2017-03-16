var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        port: 9090
    });
});

gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./src/*.html'], ['html']);
})

gulp.task('default', ['connect']);