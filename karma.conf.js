// Karma configuration
// Generated on Sat Mar 12 2016 12:59:43 GMT-0700 (MST)

module.exports = function(config) {
  var gulpConfig = require('./gulp.config')();

  config.set({

	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: '',

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: gulpConfig.karma.frameworks,

	// list of files / patterns to load in the browser
	files: gulpConfig.karma.files,

	// list of files to exclude
	exclude: gulpConfig.karma.exclude,


	// web server port
	port: 9876,


	// enable / disable colors in the output (reporters and logs)
	colors: true,


	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	logLevel: config.LOG_INFO,


	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: true,


	// start these browsers
	// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
	browsers: gulpConfig.karma.browsers,


	// Continuous Integration mode
	// if true, Karma captures browsers, runs the tests and exits
	singleRun: false,

	// Concurrency level
	// how many browser should be started simultaneous
	concurrency: Infinity
  });
}
