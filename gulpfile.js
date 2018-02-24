const gulp = require('gulp');
const inject = require('gulp-inject');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const injectable_styles = [
  './node_modules/bootstrap/dist/css/bootstrap.min.css',
];

const injectable_scripts = [
  './node_modules/underscore/underscore-min.js',
  './node_modules/angular/angular.min.js',
  './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',

  './src/utils.module.js', 
  './src/**/*.module.js',
  './src/**/*.js', 
  './demo/app.module.js', 
  './demo/**/*.module.js', 
  './demo/**/*.js',
];

const injectables = []
  .concat(injectable_styles)
  .concat(injectable_scripts)
;

const index = './index.html';

gulp.task('inject', function(){
  let target = gulp.src(index);
  let sources = gulp.src(injectables, {read: false});

  return target.pipe(inject(sources))
    .pipe(gulp.dest('./'));
});

gulp.task('build', function(){
	return gulp.src(['./src/table.module.js', './src/**.js'])
    .pipe(concat('lb-table.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(minify({
      ext: {
        min: '.min.js',
      }
    }))
    .pipe(gulp.dest('./dist/'))
  ;
});
