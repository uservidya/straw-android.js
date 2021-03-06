
exec = require('child_process').exec

module.exports = (grunt) ->


  grunt.initConfig

    shell:
      instrument:
        command: './node_modules/.bin/jscoverage src src-cov'
      'rm-instrumented':
        command: 'rm -rf src-cov'

    jshint:
      all: ['src/*.js', 'spec/*.js']
      options:
        jshintrc: '.jshintrc'

    jasmine:
      all:
        src: ['src/straw-android.js']
        options:
          specs: 'spec/*.js'
          vendor: ['bower_components/sinon-1.7.3.js/index.js']

      coverage:
        src: ['src-cov/straw-android.js']
        options:
          specs: 'spec/*.js'
          helpers: 'node_modules/jasmine-jscoverage-reporter/reporter.js'
          vendor: ['bower_components/sinon-1.7.3.js/index.js']


  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-shell'


  grunt.registerTask 'default', ['jshint', 'jasmine:all']
  grunt.registerTask 'cov', ['jshint', 'shell:instrument', 'jasmine:coverage', 'shell:rm-instrumented']
