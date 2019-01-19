var gulp = require('gulp');
var ts = require('gulp-typescript');

var tsProject = ts.createProject('tsconfig.json');

//ts文件编译后到dist中
gulp.task('scripts', function() {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});

//非ts文件原样copy
gulp.task('other', function(){
    return gulp.src('src/**/*.!(ts)').pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', gulp.series('scripts'));
    gulp.watch('src/**/*.!(ts)', gulp.series('other'));
});

gulp.task('default', gulp.series('scripts','other'));