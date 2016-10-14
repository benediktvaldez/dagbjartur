
build: gulpbuild requirejs

gulpbuild:
	@./node_modules/.bin/gulp build --env=production

requirejs:
	@./node_modules/.bin/r.js -o build-require.js
