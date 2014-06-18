testfiles = $(shell find test -name test.* -type f)

run: node_modules
	@mkdir -p tmp/images
	@$(MAKE) --no-print-directory -C lib/client/app -B
	@$(MAKE) --no-print-directory -C lib/client/out -B
	@DEBUG=cms:* supervisor -q -w lib/server -e 'js' -x node bin/run

run-production:
	@mkdir -p tmp/images
	@rm -rf public
	@$(MAKE) clean components --no-print-directory -C lib/client/app -B
	@$(MAKE) clean components --no-print-directory -C lib/client/out -B
	@DEBUG=cms:* MINIFY=1 node bin/build 
	@du -bh public/*.js
	@du -bh public/*.css
	@DEBUG=cms:* NODE_ENV=production node bin/run

deploy:
	@git push origin feature/backend | echo
	@git push heroku feature/backend:master | echo

test:
	@node bin/test $(testfiles)
	@mocha-phantomjs -R dot test/client/support.html

node_modules:
	@npm install

.PHONY: test deploy run
