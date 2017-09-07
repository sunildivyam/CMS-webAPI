'use strict';
/*
*	CKEditor loads few resources like js, css, etc. files directly from ckeditor.js (code)
*	So requiring while using browserify does not include them in the package while packaging Rather
* 	these gets downloaded at runtime fro the current CKeditor's folder.
*	So This gulp task copies ckeditor folder "node_modules/ckeditor" and all its contents to target.
*	So when ckeditor.js (packaged) requests resources, they are served from "ckeditor" from target.
*	The current Directory for CKeditor should be set from Project index.js file.
*/
module.exports = function(gulp, config) {
	var del = require('del');
    var ckConfig= {
      "src": "./node_modules/ckeditor/**/*",
      "target": "ckeditor",
      "libTarget": "ckeditor/libs",
      "mathJaxSrc": "./node_modules/mathjax/**/*",
      "mathJax": "mathjax",
      "youtube": "./node_modules/ckeditor-youtube-plugin/youtube/**/*"
    };

	gulp.task('ckeditor-clean', function() {
		return del(config.targetRoot + '/ckeditor/*');
	});

	gulp.task('ckeditor-self', function() {
		return gulp.src([ckConfig.src])
		.pipe(gulp.dest(config.targetRoot + '/' + ckConfig.target + '/'));
	});

	gulp.task('mathjax', function() {
		// MathJax
		return gulp.src([ckConfig.mathJaxSrc])
            .pipe(gulp.dest([config.targetRoot, ckConfig.libTarget, ckConfig.mathJax].join('/')));
	});

	gulp.task('ckeditor-youtube', function() {
		return gulp.src([ckConfig.youtube])
		.pipe(gulp.dest(config.targetRoot + '/' + ckConfig.target + '/plugins/youtube/'));
	});
};