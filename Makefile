.PHONY: default test coveralls

GRUNT = ./node_modules/.bin/grunt

default:
ifndef TRAVIS_JOB_ID
	@$(MAKE) test
else
	@$(MAKE) coveralls
endif

test:
	$(GRUNT)

coveralls:
	$(GRUNT) cov --no-color | node_modules/jasmine-jscoverage-reporter/convert-to-coveralls.js 
#| curl -F "json_file=@-" https://coveralls.io/api/v1/jobs
