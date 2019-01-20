var gulp = require('gulp');
var ts = require('gulp-typescript');
var opn = require('opn');
var shell = require('shelljs');

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

gulp.task('browser',function(cb){
    opn('http://localhost:3100', {app: ['google chrome', '--incognito']});
    cb();
});

gulp.task('nodemon',function(cb){
    shell.exec('nodemon ./dist/index.js');
    cb();
});

gulp.task('watch', function() {
    gulp.watch('src/**/*.ts', gulp.series('scripts'));
    gulp.watch('src/**/*.!(ts)', gulp.series('other'));
});

gulp.task('default', gulp.series('scripts','other',gulp.parallel('browser','nodemon')));