(function() {
	const gulp = require('gulp'),
   		config = require('./gulp.config')(),
		paths = config.paths,
		connect = require('gulp-connect'),
		$ = require('gulp-load-plugins')({lazy: true}),
		chalk = require('chalk'),
		runSequence = require('gulp-run-sequence'),
		karmaServer = require('karma').Server;

	// Tasks
	gulp.task('default', [
		'connect', 'wiredep', 'watch'
	]);
	gulp.task('watch', [
		'watch-less', 'watch-scripts'
	]);
	gulp.task('connect', startServer);
	gulp.task('wiredep', wiredep);
	gulp.task('watch-html', watchHtml);
	gulp.task('watch-less', watchLess);
	gulp.task('watch-scripts', watchScripts);
	gulp.task('less', less);
	gulp.task('inject-css', injectCss);
	gulp.task('inject-js', injectJs);
	gulp.task('test', test);

	function startServer() {
		connect.server({
			root: paths.root,
			livereload: true,
			debug: true
		});
	};

	function wiredep(){
		var wiredep = require('wiredep').stream;

		return gulp.src(
        	paths.index
        )
        .pipe(
        	wiredep(config.bower)
        )
        .pipe(
        	gulp.dest(paths.root)
        );
	};

	// Watch
	function watchHtml(){
		console.log(
			chalk.yellow('Watching for change in index.html...')
		);
	    console.log($.livereload)

		return $.watch(
			[paths.index]
		)
		.pipe($.livereload());
	};

	function watchLess() {
		console.log(
			chalk.yellow('Watching for change in less files...')
		);

		return gulp.src(
			paths.less
		)
		.pipe(
			$.watch(paths.less, function(){
				runSequence(
					'less',
					'inject-css'
				)
			})
		);
	};

	function watchScripts(){
		return gulp.src(
			paths.js
		)
		.pipe(
			$.watch(paths.js, injectJs)
		);
	};

	// Styles
	function less() {
		return gulp.src(
			paths.less
		)
		.pipe(
			$.less()
		)
		.pipe(
			gulp.dest(paths.content)
		);
	};

	function injectCss(){
	    return gulp.src(
        	paths.index
        )
        .pipe(
        	$.inject(
        		gulp.src(paths.css), 
        		config.inject
        	)
        )
        .pipe(
        	gulp.dest(paths.root)
        );
	};

	// Scripts
	function injectJs() {
	    return gulp.src(
        	paths.index
        )
        .pipe(
        	$.inject(
        		gulp.src(paths.js),
        		config.inject
        	)
        )
        .pipe(
        	gulp.dest(paths.root)
        );
	};

	function test(done){
		new karmaServer({
			configFile: __dirname + '/karma.conf.js',
			singleRun: true
		}, done).start();
	}
	
})();
