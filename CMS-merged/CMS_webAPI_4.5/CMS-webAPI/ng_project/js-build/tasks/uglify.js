'use strict';
/*
	Gulp task "uglify" uses 'index.js' and minifies it into 'index.min.js'
*/

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function(gulp, config) {
	gulp.task('uglify', function() {
		return gulp.src(config.targetRoot + '/' + config.main)
		.pipe(sourcemaps.init())
		.pipe(rename('index.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.targetRoot + '/'));
	});
};
