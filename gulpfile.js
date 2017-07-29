var gulp = require('gulp');
var browserify = require('gulp-browserify');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var reload = browserSync.reload;


// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('js-watch', ['js'], browserSync.reload);

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['sass'], function() {

    // browserSync.init({
    //     server: "./app"
    // });

    // 从这个项目的根目录启动服务器


    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    // 添加 browserSync.reload 到任务队列里
    // 所有的浏览器重载后任务完成。
    // gulp.watch("js/*.js", ['js-watch']);
    gulp.watch("app/*.html").on('change', reload);
});

// 处理完JS文件后返回流
gulp.task('js', function() {
    return gulp.src('app/js/*js')
        .pipe(browserify())
        // .pipe(uglify())
        .pipe(gulp.dest('app/dist/js'));
});


// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/dist/css"))
        .pipe(reload({ stream: true }));
});

gulp.task('devs', ['serve']);

// 代理

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });