var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat');
	minify = require('gulp-minify');
	minifyCss = require('gulp-minify-css');

var components = 'bower_components/';

var paths = {
	'jquery': components + 'jquery/dist/',
	'bootstrap': components + 'bootstrap-sass/assets/',
};

// Add bootstrap styles to project
gulp.task('bootstrapstyles', function() {
	gulp.src(paths.bootstrap + 'stylesheets/*')
		.pipe(gulp.dest('assets/bootstrap-sass'));
	gulp.src(paths.bootstrap + 'stylesheets/bootstrap/*')
		.pipe(gulp.dest('assets/bootstrap-sass/bootstrap'));
	gulp.src(paths.bootstrap + 'stylesheets/bootstrap/mixins/*')
		.pipe(gulp.dest('assets/bootstrap-sass/bootstrap/mixins'));
});

// Add bootstrap scripts to project
gulp.task('bootstrapscripts', function() {
	gulp.src(paths.bootstrap + 'javascripts/bootstrap.min.js')
		.pipe(gulp.dest('assets/js/bootstrap-js/'));
});

// Add jQuery to project
gulp.task('jQuery', function() {
	gulp.src(paths.jquery + 'jquery.min.js')
		.pipe(gulp.dest('assets/js/jquery/'));
});


// Merge and Compile Styles
gulp.task('styles', function() {
    gulp.src('assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('./'));
});

// Merge Scripts
gulp.task('scripts', function() {
    gulp.src(['assets/js/jquery/*.js', 'assets/js/bootstrap-js/*.js', 'assets/js/particles.min/js', 'assets/js/*.js'])
    	.pipe(concat('scripts.js'))
    	.pipe(minify())
        .pipe(gulp.dest('./js/'));
});

// gulp.task('default', ['styles', 'copybootstrap']);

// Watch task
gulp.task('default', ['bootstrapstyles', 'bootstrapscripts', 'jQuery', 'styles', 'scripts'], function() {

	// Watch .scss files
    gulp.watch(['assets/sass/*.scss', 'assets/sass/*/*.scss', 'assets/sass/*/*/*.scss'], ['styles']),

    // Watch .js files
  	gulp.watch('assets/js/*.js', ['scripts']);
    
});