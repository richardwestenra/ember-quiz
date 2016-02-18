testfiles = $(shell find test -name test.* -type f)

run: node_modules
	@$(MAKE) --no-print-directory -C lib/client/app -B
	@$(MAKE) --no-print-directory -C lib/client/out -B
	@DEBUG=cms:* supervisor -q -w lib/server -e 'js' -x node bin/run

run-production:
	@rm -rf public
	@$(MAKE) components --no-print-directory -C lib/client/app -B
	@$(MAKE) components --no-print-directory -C lib/client/out -B
	@DEBUG=cms:* MINIFY=1 node bin/build 
	# @du -bh public/*.js
	# @du -bh public/*.css
	@DEBUG=cms:* NODE_ENV=production node bin/run

deploy:
	@git push origin master | echo
	@git push heroku master | echo

test:
	@node bin/test $(testfiles)
	@mocha-phantomjs -R dot test/client/support.html

node_modules:
	@npm install

.PHONY: test deploy run
