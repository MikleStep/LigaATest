'use strict';

var gulp = require("gulp"),
  watch = require("gulp-watch"),
  prefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  rigger = require("gulp-rigger"),
  cssmin = require("gulp-clean-css"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  rimraf = require("rimraf"),
  browserSync = require("browser-sync").create(),
  webpack = require("webpack-stream"),
  reload = browserSync.reload;

const isDevMode = false;
const isProdMode = !isDevMode;

var path = {
  build: {
    //Хранилище готовых сборки
    html: 'build/',
    js: 'build/js/',
    css: 'build/style/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    //Пути откуда брать исходники
    html: 'src/*.html',
    js: 'src/js/main.js', //В стилях и скриптах нам понадобятся только main файлы
    style: 'src/style/main.sass',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.sass',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: './build'
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: 'Frontend_Devil'
};

const webpackConfig = {
  output: {
    filename: `main.js`
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  mode: isDevMode ? "development" : "production",
  devtool: isDevMode ? "source-map" : "none",
  externals: {
    jquery: "jQuery"
  }
};



gulp.task('html:build', function () {
  return gulp.src(path.src.html) //Выберем файлы по нужному пути
    .pipe(rigger()) //Прогоним через rigger
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

gulp.task("js:build", function () {
  return gulp
    .src(path.src.js, '!js/slick.min.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true })); //И перезагрузим наш сервер для обновлений
});

gulp.task('style:build', function () {
  return gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});

gulp.task('image:build', function () {
  return gulp.src(path.src.img) //Выберем наши картинки
    .pipe(
      imagemin({
        //Сожмем их
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
        interlaced: true
      })
    )
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({ stream: true }));
});

gulp.task('fonts:build', function () {
  return gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts));
});

gulp.task('build',
  gulp.parallel(
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
  )
);

gulp.task('watch', function () {
  gulp.watch([path.watch.html], gulp.parallel('html:build'));
  gulp.watch([path.watch.style], gulp.parallel('style:build'));
  gulp.watch([path.watch.js], gulp.parallel('js:build'));
  gulp.watch([path.watch.img], gulp.parallel('image:build'));
  gulp.watch([path.watch.fonts], gulp.parallel('fonts:build'));
});

gulp.task('webserver', function () {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});
gulp.task('server', gulp.parallel('webserver', 'watch'));
gulp.task('start', gulp.parallel('build', 'webserver', 'watch'));