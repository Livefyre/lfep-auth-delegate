.PHONY: server test dist deploy

ENV=dev

server:
	node ./server.js

install: package.json bower.json
	npm install
	node node_modules/.bin/bower install
	touch $@

test: install
	node node_modules/.bin/tap test/*.js

dist: install
	mkdir -p dist
	node ./node_modules/requirejs/bin/r.js -o ./build.conf.js
	node ./node_modules/requirejs/bin/r.js -o ./build.conf.js optimize=none out=./dist/index.js

deploy: dist
	node ./node_modules/.bin/lfcdn -e $(ENV)

clean:
	-rm -rf dist node_modules bower_components
	-rm install
