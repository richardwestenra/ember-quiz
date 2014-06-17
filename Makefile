component=./node_modules/component-hooks/node_modules/.bin/component
testfiles = $(shell find test -name test.* -type f)
categories =\
	landing-pages \
	sales-pages \
  squeeze-pages \
  404-ages \
  thank-you-pages

run: node_modules
	@$(MAKE) components -B
	@DEBUG=cms:* supervisor -q -w lib/server -e 'js' -x node bin/run

run-production:
	@rm -rf public components
	@$(MAKE) components
	@DEBUG=cms:* MINIFY=1 node bin/build 
	@du -bh public/*.js
	@du -bh public/*.css
	@DEBUG=cms:* NODE_ENV=production node bin/run

deploy:
	@git push origin feature/backend | echo
	@git push heroku feature/backend | echo

test:
	@node bin/test $(testfiles)
	@mocha-phantomjs -R dot test/client/support.html

node_modules:
	@npm install

components:
	@$(component) install --dev

.PHONY: test deploy run
