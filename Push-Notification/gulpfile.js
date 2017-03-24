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
    return gulp.src('dev/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./src/js/'));
});

gulp.task('html', function() {
    gulp.src('./src/*.html')
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('dev/*.js')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['./src/*.html', 'dev/*.js'], ['html', 'js']);
})

gulp.task('default', ['connect', 'es6', 'watch']);