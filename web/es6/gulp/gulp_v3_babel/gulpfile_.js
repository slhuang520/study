const gulp = require('gulp');
const uglify = require('gulp-uglify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const buffer = require('vinyl-buffer');

// 监视文件变化，自动执行任务，自行按需使用，非必须。
gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['browserify']);
});

// browserify
gulp.task("browserify", function () {
    var b = browserify({
        entries: "./src/js/entry.js"
    });

    return b.transform(babelify, {
        presets: [
            'env'  //转换es6代码
        ]
    })
    .bundle()
    .pipe(source("app.min.js"))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

gulp.task('default', ['browserify']);
