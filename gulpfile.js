const gulp = require('gulp');
const yaml = require('gulp-yaml');
const connect = require('gulp-connect');
const yamlPath = './api/swagger/swagger.yaml';

gulp.task('default', ['connect', 'watch']);

gulp.task('watch', function() {
    gulp.watch(yamlPath, ['yaml2json']);
});

gulp.task('yaml2json', function() {
    return gulp.src(yamlPath)
        .pipe(yaml())
        .on('error', function(error) {
            console.log(error);
            this.emit('end')
        })
        .pipe(gulp.dest('./public/'))
        .pipe(connect.reload())
});

gulp.task('connect', function() {
    connect.server({
        root: 'public',
        livereload: true
    });
});
