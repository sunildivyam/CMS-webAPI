'use strict';
/*
	Gulp task "cleanCss" uses 'main.css' and minifies it into 'main.min.css'
*/

var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

module.exports = function(gulp, config) {
	gulp.task('cleanCss', function() {
        return gulp.src([config.targetRoot, config.stylesDir, config.less.cssFileName + '.css'].join('/'))
            .pipe(rename(config.less.cssFileName + '.min.css'))
		.pipe(cleanCss())
            .pipe(gulp.dest(config.targetRoot + '/' + config.stylesDir));
	});
};
