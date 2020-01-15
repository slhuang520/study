const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

// 编译并压缩js
gulp.task('js', function(){
    return gulp.src('src/js/*.js')
    .pipe(babel())
    // .pipe(concat('app.js')) //should't merge for browserify support require module
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
});

// 监视文件变化，自动执行任务，自行按需使用，非必须。
gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['browserify']);
});

// browserify [not support import|export but require]
gulp.task('browserify', ['js'], function () {
    var b = browserify({
        entries: './build/js/entry.js'
    });

    return b.bundle()
        .pipe(source('app.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['browserify']);
