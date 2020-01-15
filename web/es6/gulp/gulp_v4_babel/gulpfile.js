const gulp = require("gulp"),
    babel = require("gulp-babel"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream");

gulp.task("js", function () {
    return gulp.src("./src/js/*.js")
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest("build/js"));
});

gulp.task("browserify", gulp.series(["js"], function () {
    var b = browserify({
        entries: "./build/js/entry.js"
    });

    return b.bundle()
        .pipe(source("app.min.js"))
        .pipe(gulp.dest("./dist/js"));
}));

gulp.task("default", gulp.series(["browserify"]));
