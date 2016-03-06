const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify') ;
const fs = require('fs') ;
const watchify = require('watchify');


gulp.task('default', function(){
   var b = browserify({
      entries: ['./public/javascripts/react_scripts/main.js'],
      cache:{},
      packageCache:{},
      plugin:[watchify]
   });

   b.on('update', bundle);

   b.on('log', function(msg){
      console.info(msg) ;
   });

   bundle();

   function bundle(){
      b.transform("babelify", {
         presets: ["es2015", "react"]
      })
      .bundle()
      .pipe(fs.createWriteStream("./public/javascripts/main.js")) ;
   }

} ) ;


