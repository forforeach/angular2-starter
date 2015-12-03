var gulp = require('gulp');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var del = require('del');
var runSequence = require('run-sequence');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');
var open = require('gulp-open');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var KarmaServer = require('karma').Server;
var rimraf = require('gulp-rimraf');


// Add debounce to gulp watch for FTP
// (function ftp_debounce_fix() {
// 
// 	var watch = gulp.watch;
// 	// Overwrite the local gulp.watch function
// 	gulp.watch = function (glob, opt, fn) {
// 		var _this = this, _fn, timeout;
// 		// This is taken from the gulpjs file, but needed to
// 		// qualify the "fn" variable
// 		if (typeof opt === 'function' || Array.isArray(opt)) {
// 			fn = opt;
// 			opt = null;
// 		}
// 		// Make a copy of the callback function for reference
// 		_fn = fn;
// 		// Create a new delayed callback function
// 		fn = function () {
// 			if (timeout) {
// 				clearTimeout(timeout);
// 			}
// 			timeout = setTimeout(Array.isArray(_fn) ? function () {
// 				_this.start.call(_this, _fn);
// 			} : _fn, 1);
// 		};
// 		return watch.call(this, glob, opt, fn);
// 	};
// })();

var serverOptions = {
	root: '',
	port: 8000,
	livereload: true,
};

var srcPath = 'src/app';
var testPath = 'src/test';

var tasks = {
	defaultTask: 'default',
	typeScript: 'typeScript-compile',
	clean: 'clean',
	buildSass: 'build-sass',
	startWebServer: 'start-webServer',
	openBrowser: 'open-browser',
	reload: 'reload',
	watch: 'watch',
	watcherRebuild: 'watcher-rebuild',
	testBuild: 'test-build',
	test: 'test'
};

var tsProject = ts.createProject('tsconfig.json', {
	typescript: typescript
});


// Main task 
gulp.task(tasks.defaultTask, function () {
	runSequence(
		tasks.clean,
		[tasks.typeScript, tasks.buildSass],
		//tasks.test,
		tasks.startWebServer,
		tasks.openBrowser,
		tasks.watch
		);
});

// default task starts watcher. in order not to start it each change
// watcher will run the task bellow
gulp.task(tasks.watcherRebuild, function (callback) {
	runSequence(
		[tasks.typeScript, tasks.buildSass],
		//tasks.test,
		tasks.reload
		);
	callback();
});

// compiles *.ts files by tsconfig.json file and creates sourcemap filse
gulp.task(tasks.typeScript, function () {
	return gulp.src([srcPath + '/**/**.ts'])
		.pipe(sourcemaps.init())
        .pipe(ts(tsProject))
		.pipe(sourcemaps.write('./', { includeContent: false, sourceRoot: '/' + srcPath }))
        .pipe(gulp.dest(srcPath));
});

// build sass files into css files
gulp.task(tasks.buildSass, function () {
	return gulp.src(srcPath + '/**/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(plumber.stop())
		.pipe(gulp.dest(srcPath));
});

// reload the browser
gulp.task(tasks.reload, function () {
	gulp.src(srcPath)
		.pipe(connect.reload());
});

// sets watcher to the files
gulp.task(tasks.watch, function () {
	gulp.watch([
		'/index.html',
		srcPath + '/**/**.ts',
		srcPath + '/**/**.html',
		srcPath + '/**/**.scss'], [tasks.watcherRebuild]);
});

// starts web server
gulp.task(tasks.startWebServer, function () {
	connect.server(serverOptions);
});

// opens browser
gulp.task(tasks.openBrowser, function () {
	gulp.src('./index.html')
		.pipe(open({ uri: 'http://localhost:' + serverOptions.port }));
});

// removes .js, .js.map, .css, .css.map
gulp.task(tasks.clean, function () {
	return gulp.src([
		srcPath + '/**/**.js',
		srcPath + '/**/**.js.map',
		srcPath + '/**/**.css',
		testPath + '/**/**.js',
		testPath + '/**/**.js.map'])
   .pipe(rimraf());
});


// tests 		
gulp.task(tasks.testBuild, function () {
	return gulp.src([testPath + '/**/**.ts'])
		.pipe(sourcemaps.init())
        .pipe(ts(tsProject))
		.pipe(sourcemaps.write('./', { includeContent: false, sourceRoot: '/' + testPath }))
        .pipe(gulp.dest(testPath));
});

gulp.task(tasks.test, [tasks.testBuild], function (done) {
	new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start();
});