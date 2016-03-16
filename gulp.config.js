module.exports = function() {
	var root = './src/'
		app = root + 'app/',
		content = root + 'content/',
		bowerPath = content + 'bower_components/',
		wiredep = require('wiredep'),
		bowerFiles = wiredep({devDependencies: false})['js'],
		nodeModules = './node_modules/';

	var config = {
		paths: {
			root: root,
	        index: root + 'index.html',
	        content: content,
	        bower: bowerPath,
			app: app,
	        less: app + '**/*.less',
	        css: [
	        	content + '**/*.css',
	            '!' + bowerPath + '**/*.css'
	        ],
	        // app js, with no specs
	        js: [
	            app + '**/*.app.js',
	            app + '**/*.module.js',
	            app + '**/*.js',
	            '!' + app + '**/*.spec.js',
	            '!' + bowerPath + '**/*.js'
	        ]
		},
		bower: {
			json: require('./bower.json'),
            directory: bowerPath,
            ignorePath: '/^(\.\.\/)+/'
		},
		bowerFiles: bowerFiles,
		inject: {
			relative: true
		},
		testlibraries: [
			nodeModules + '/mocha/lib/mocha.js',
			nodeModules + '/chai/chai.js',
			nodeModules + '/sinon-chai/lib/sinon-chai.js'
		],
		// specHelpers: [app + 'test-helpers/*.js'],
		specs: [app + '**/*.spec.js']
	};

	/**
	 * karma settings
	 */
	config.karma = getKarmaOptions();

	return config;

	////////////////

	function getKarmaOptions() {
		var options = {
			files: [].concat(
				bowerFiles,
				nodeModules + 'bardjs/bard.js',
				bowerPath + 'angular-mocks/angular-mocks.js',
				app + '**/*.app.js',
				app + '**/*.module.js',
				app + '**/*.js'
			),
			frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai'],
			exclude: [],
			browsers: ['Chrome']

		};
		return options;
	}
};
