// require modules
var gulp = require('gulp'),
    prettify = require('gulp-prettify'),
    CSSmin = require('gulp-minify-css'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'), // 捕捉错误，遇错也能继续运行
    changed = require('gulp-changed'), // 改动的文件
    fileinclude = require('gulp-file-include'),
    using = require('gulp-using'),
    gulpFilter = require('gulp-filter'),
    autoprefix = require('gulp-autoprefixer'),
    // cache = require('gulp-cached'),
    prod = process.env.NODE_ENV === 'prod';

// file & folder paths
var meta = {
    src: {
        root: 'src',
        html: ['src/html/**/*.html', '!src/html/**/-*.html'],
        css: ['src/css/**/*.css', '!src/css/base/**/*.css', '!src/css/mod/**/*.css', '!src/css/**/pub-*.css', '!src/css/**/*-mod-*.css'],
        js: 'src/js/**/*.js',
        img: 'src/img/**/*',
        html_tmp: 'src/tmp',
        html_watch: 'src/html/**/*.html',
        css_watch: 'src/css/**/*.css'
    },
    build: {
        root: 'build',
        html: 'build/html',
        css: 'build/css',
        js: 'build/js',
        img: 'build/img'
    }
}

// tasks

// process html

gulp.task('process-html', function() {

    return gulp.src(meta.src.html)
        // .pipe(cache('html'))
        .pipe(changed(meta.src.html_watch, {hasChanged: changed.compareSha1Digest}))
        .pipe(plumber())
        .pipe(using({
            prefix: 'Using',
            color: 'green'
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(prettify({
            indentSize: 2,
            unformatted: ['pre', 'code']
        }))
        .pipe(gulp.dest(meta.src.html_tmp))
        .pipe(gulp.dest(meta.build.html));
});


// process css

gulp.task('process-css', function() {

    return gulp.src(meta.src.css)
        .pipe(changed(meta.build.css))
        .pipe(plumber())
        .pipe(autoprefix('last 2 version', '> 5%', 'safari 5', 'ie 8', 'ie 7', 'opera 12.1'))
        .pipe(using({
            prefix: 'Using',
            color: 'green'
        }))
        .pipe(CSSmin())
        .pipe(gulp.dest(meta.build.css));
});


// process js

gulp.task('process-js', function() {
    return gulp.src(meta.src.js)
        .pipe(changed(meta.build.js))
        .pipe(plumber())
        .pipe(using({
            prefix: 'Using',
            color: 'green'
        }))
        .pipe(gulp.dest(meta.build.js));
});


// process img

gulp.task('process-img', function() {
    return gulp.src(meta.src.img)
        .pipe(changed(meta.build.img))
        .pipe(plumber())
        .pipe(using({
            prefix: 'Using',
            color: 'green'
        }))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest(meta.build.img));
});


// clean

gulp.task('clean-all', function() {
    return gulp.src([meta.src.html_tmp, meta.build.root], {
        read: false
    }).pipe(clean({
        force: true
    }));
});


//Local Server + Reload
var root = prod ? meta.build.root : meta.src.root;
gulp.task('connect', function() {
    connect.server({
        root: root,
        port: 9001,
        livereload: true
    });
});

gulp.task('reload', function() {
    var root_path = prod ? meta.build.root + '/html/**/*.html' : meta.src.html_tmp + '/**/*.html';
    gulp.src(root_path).pipe(connect.reload());
});


// watch

gulp.task("watch", function() {

    var watchHtml = gulp.watch(meta.src.html_watch, ['process-html', 'reload']);
    gulp.watch(meta.src.css_watch, ['process-css', 'reload']);
    gulp.watch(meta.src.js, ['process-js'], 'reload');
    gulp.watch(meta.src.img, ['process-img', 'reload']);

    // gulp.watch([root + '/**/*.html', root + '/**/*.css', root + '/**/*.js'], ['reload']);
    

    // watchHtml.on('change', function (event) {
    //     if (event.type === 'deleted') { // if a file is deleted, forget about it
    //         delete cache.caches['html'][event.path];
    //         // remember.forget('scripts', event.path);
    //     }
    // });

});

// default task

gulp.task('default', ['process-html', 'process-css', 'process-js', 'process-img', 'connect', 'watch']);

gulp.task('clear', ['clean-all']);