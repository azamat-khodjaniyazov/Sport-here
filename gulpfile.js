const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const fileinclude = require('gulp-file-include');
const del = require('del');


// gulp.task('hello', function(callback) {
// 	console.log('Hello from Gulp!');
// 	callback();
// });

// gulp.task('second', function(callback) {
//    console.log('Hello from SECOND task');
//    callback();
// });

// gulp.task('third', function(callback) {
//    console.log('Hello from THIRD task');
//    callback();
// });

// gulp.task('fourth', function(callback) {
//    console.log('Hello from FOURTH task');
//    callback();
// });

// gulp.task('default', gulp.series('hello', 'second') );
// gulp.task('default', gulp.parallel('hello', 'second') );
// gulp.task('default', gulp.series('hello', gulp.parallel('second', 'third'), 'fourth' ) );

gulp.task('html', function(callback) {
   return gulp.src('.src/html/*.html')
   .pipe(plumber({
		errorHandler: notify.onError(function(err) {
			return {
				title: 'HTML include',
				sound: false,
				message: err.message
			}
		})
	}))
   .pipe(fileinclude({
   	prefix: '@@'
   }))
	 .pipe(gulp.dest('./src/'))
	 .pipe(browserSync.stream())
   callback();
});

gulp.task('scss', function(callback) {
	return gulp.src('./src/scss/style.scss')
	.pipe(sourcemaps.init())
	.pipe(plumber({
		errorHandler: notify.onError(function(err) {
			return {
				title: 'Styles',
				sound: false,
				message: err.message
			}
		})
	}))
	.pipe(sass())
	.pipe(autoprefixer({
		overrideBrowserslist: ['last 4 versions']
	}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('./build/css/'))
	.pipe(browserSync.stream())
	callback();
});

gulp.task('copy:img', function(callback) {
	return gulp.src('./src/img/**/*.*')
	.pipe(gulp.dest('./build/img'))
	.pipe(browserSync.stream())
	callback();
});

gulp.task('copy:html', function(callback) {
	return gulp.src('./src/html/*.html')
	.pipe(plumber({
		errorHandler: notify.onError(function(err) {
			return {
				title: 'HTML include',
				sound: false,
				message: err.message
			}
		})
	}))
   .pipe(fileinclude({
   	prefix: '@@'
   }))
	.pipe(gulp.dest('./build/'))
	.pipe(browserSync.stream())
	callback();
});

gulp.task('copy:js', function(callback) {
	return gulp.src('./src/js/**/*.*')
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream())
	callback();
});

// gulp.task('watch', function() {
// 	watch(['./build/*.html', './build/css/**/*.css'], gulp.parallel(browserSync.reload));

gulp.task('watch', function() {
	watch(['./build/img/**/*.*', './build/js/**/*.*'], gulp.parallel(browserSync.reload));

	// watch('./src/scss/**/*.scss', gulp.parallel('scss'));

	watch('./src/scss/**/*.scss', function() {
		setTimeout(gulp.parallel('scss'), 1000)
	});

	watch('./src/html/**/*.html', gulp.parallel('html'))

	watch('./src/img/**/*.*', gulp.parallel('copy:img'))
	watch('./src/js/**/*.*', gulp.parallel('copy:js'))
	
});

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
});

gulp.task('clean:build', function() {
	return del('./build')
});

// gulp.task('default', gulp.parallel('server', 'watch') );
// gulp.task('default', gulp.parallel('server', 'watch', 'scss', 'html') );

// gulp.task('default', gulp.series(gulp.parallel('scss', 'html', 'copy:img', 'copy:html', 'copy:js'), gulp.parallel('server', 'watch')));

gulp.task('default', gulp.series(gulp.parallel('clean:build'), gulp.parallel('scss', 'html', 'copy:img', 'copy:js', 'copy:html'), gulp.parallel('server', 'watch'),));