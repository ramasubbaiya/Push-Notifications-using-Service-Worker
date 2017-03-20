const gulp = require('gulp');
const connect = require('gulp-connect');
const babel = require('gulp-babel');

gulp.task('connect', function() {
    connect.server({
        port: 9090,
        livesync: true
    });
});

gulp.task('es6', function() {
    return gulp.src('./src/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('./src/js/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./src/*.html'], ['html', 'js']);
})

gulp.task('default', ['connect', 'es6', 'watch']);