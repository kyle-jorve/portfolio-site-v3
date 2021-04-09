const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const uglifysass = require('gulp-uglifycss');
const del = require('del');
const fs = require('fs');
const mode = require('gulp-mode')({
	modes: ['production', 'development'],
	default: 'development',
	verbose: false
});
const rename = require('gulp-rename');

const config = {
	scripts: '/src/scripts/**/*.js',
	sass: '/src/sass/**/*.scss'
};

const watchSource = {
	scripts: config.scripts,
	sass: config.sass
};

const delConfig = {
	all: ['/dist/scripts/*.js', '/dist/styles/*.css'],
	scripts: '/dist/scripts/*.js',
	css: '/dist/styles/*.css'
};

const build = gulp.series(cleanAll(), gulp.parallel(buildScripts, buildStyles), cb => {
	console.log('----- Build finished -----');

	cb();
});

function cleanScripts() {
	return del(delConfig.scripts);
}

function cleanStyles() {
	return del(delConfig.css);
}

function cleanAll() {
	return gulp.parallel(cleanScripts, cleanStyles);
}

function buildScripts() {
	return gulp
		.src(config.scripts)
		.on('error', console.error.bind(console))
		.pipe(mode.production(uglify()))
		.pipe(
			rename(path => {
				path.dirname = '';
			})
		)
		.pipe(gulp.dest('/dist/scripts'));
}

function buildStyles() {
	return gulp
		.src(config.sass)
		.pipe(sass().on('error', sass.logError))
		.pipe(
			mode.production(
				uglifysass({
					uglyComments: true
				})
			)
		)
		.pipe(concat('bundle.min.css'))
		.pipe(gulp.dest('/dist/styles'));
}

function complete(cb) {
	console.log('----- task complete -----');

	cb();
}

function watch() {
	// watch scripts
	gulp.watch(watchSource.scripts, gulp.series(cleanScripts, buildScripts, complete));

	// watch sass
	gulp.watch(watchSource.sass, gulp.series(cleanStyles, buildStyles, complete));
}

exports.clean = cleanAll();
exports.build = build;
exports.watch = watch;

// default task
exports.default = build;
