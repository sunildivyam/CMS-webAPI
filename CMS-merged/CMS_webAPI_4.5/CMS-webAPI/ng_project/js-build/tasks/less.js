'use strict';
var less = require('gulp-less');

module.exports = function (gulp, config) {
    config.less.paths.push([config.sourceRoot, config.stylesDir, config.less.appIncludesDir].join('/'));
    gulp.task('less', function () {
        return gulp.src([[config.sourceRoot, config.stylesDir, config.less.cssFileName].join('/') + '.less'])
		.pipe(less({
            'paths': config.less.paths
		}))
		.pipe(gulp.dest(config.targetRoot + '/' + config.stylesDir));
	});
};