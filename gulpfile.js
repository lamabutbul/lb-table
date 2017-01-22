var gulp = require('gulp');
var inject = require('gulp-inject');

var injectable_styles = ['./src/theme/**/*.css', './src/**/*.css'];
var injectable_scripts = ['./src/utils.module.js', './src/**/*.module.js', './src/**/*.js', './demo/app.module.js', './demo/**/*.module.js', './demo/**/*.js'];

var injectables = [].concat(injectable_styles).concat(injectable_scripts);

var index = './index.html';

gulp.task('inject', function(){
    var target = gulp.src(index);
    var sources = gulp.src(injectables, {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));
});