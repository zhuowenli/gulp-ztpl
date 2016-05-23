#gulp-ztpl

-------------

> [tmodjs](https://github.com/aui/tmodjs)'s gulp version.

## Install

```sh
$ npm install gulp-ztpl --save-dev
```

## Usage

```javascript
var tmodjs = require('gulp-ztpl');

gulp.task('default', function(){

	return gulp.src('./test/tpl/**/*.html')
			.pipe(tmodjs({
				base: './test/tpl',
				combo: true,
				output: './test/dist'
			}));

});
```

## Watch

```javascript
gulp.task('watch', function(){
	return gulp.src('./test/tpl/**/*.html')
			.pipe(watch(function(files){
				files.pipe(tmodjs({
					base: './test/tpl',
					combo: true,
					output: './test/dist'
				}));
			}));
});
```
More see [gulp-watch](https://github.com/floatdrop/gulp-watch)

## Test

```sh
$ npm test
```

## More

See [__tmodjs__](https://github.com/aui/tmodjs)
