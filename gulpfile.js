/**
 * Created by wally on 2017/1/3.
 */

var gulp = require('gulp');             // 載入 gulp
var gulpSass = require('gulp-sass');    // 載入 gulp-sass

var uglify = require('gulp-uglify');    //載入 gulp-uglify
var pump = require('pump');             //載入 gulp-pump

gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('original_js/*.js', ['compress']);
});

gulp.task('styles', function () {
    gulp.src('sass/**/*.scss')    // 指定要處理的 scss 檔案目錄
        .pipe(gulpSass({          // 編譯 scss
            outputStyle: 'compressed'   //壓縮 css
        }))
        .pipe(gulp.dest('css'));  // 指定編譯後的 css 檔案目錄
});

gulp.task('compress', function (cb) {
    pump([
            gulp.src('original_js/*.js'), // 指定要處理的 javascript 檔案目錄
            uglify(),                     // 壓縮 javascript
            gulp.dest('js')               // 指定編譯後的 javascript 檔案目錄
        ],
        cb
    );
});