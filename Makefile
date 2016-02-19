run: node_modules
	@$(MAKE) components
	@DEBUG=app:*,builder:* supervisor -q -w lib/server -e 'js' -x node bin/run

run-production: node_modules
	@DEBUG=app:* NODE_ENV=production node bin/run

deploy:
	@git push origin master | echo
	@git push heroku master | echo

node_modules:
	@npm install

build:
	@$(MAKE) components
	@NODE_PATH=$NODE_PATH:.:.. MINIFY=1 DEBUG=app:*,builder:* node bin/build
	@du -H lib/public/*.js
	@du -H lib/public/*.css

heroku:
	@$(MAKE) build

components:
	@$(MAKE) components --no-print-directory -C lib/client/app -B
	@$(MAKE) components --no-print-directory -C lib/client/out -B

.PHONY: components heroku build deploy run-production run
