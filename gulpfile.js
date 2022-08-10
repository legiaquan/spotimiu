var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var livereload = require('gulp-livereload');

// sass compiler
gulp.task('sass', function () {
    return gulp.src(['assets/scss/style.scss'])
        .pipe(sass({ outputStyle: 'compressed' })) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('assets/css'))
        .pipe(livereload());
});

// watch for changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['assets/scss/**/*.scss'], gulp.series('sass'));
});

// Default Task
gulp.task('default',  gulp.series('sass'));
