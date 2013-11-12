.PHONY: default test coveralls

GRUNT = ./node_modules/.bin/grunt

test:
	$(GRUNT)

coveralls:
	$(GRUNT) cov --no-color | node_modules/jasmine-jscoverage-reporter/convert-to-coveralls.js | curl -F "json_file=@-" https://coveralls.io/api/v1/jobs
