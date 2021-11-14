install:
	npm ci
gendiff:
	node bin/genDiff.js
lint:
	npx eslint .
test:
	npx jest

