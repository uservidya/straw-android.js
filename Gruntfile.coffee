
exec = require('child_process').exec

module.exports = (grunt) ->


  grunt.initConfig

    shell:
      instrument:
        command: './node_modules/.bin/jscoverage src src-cov'
      'rm-instrumented':
        command: 'rm -rf src-cov'

    jshint:
      all: 'src/*.js'
      options:
        jshintrc: '.jshintrc'

    jasmine:
      all:
        src: ['src/straw-android.js', 'src/straw-android-plugin']
        options:
          specs: 'spec/*.js'

      coverage:
        src: ['src-cov/straw-android.js', 'src-cov/straw-android-plugin']
        options:
          specs: 'spec/*.js'
          helpers: 'spec/helper/coverage-reporter.js'


  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-shell'


  grunt.registerTask 'coveralls', 'read coverage data from stdin and report it to coveralls.io', ->

    done = this.async()

    readline = require 'readline'

    rl = readline.createInterface
      input: process.stdin
      output: process.stdout
      terminal: false

    rl.on 'line', (line) ->
      grunt.log.write(line)

    rl.on 'close', ->
      done(true)


  grunt.registerTask 'default', ['jshint', 'jasmine:all']
  grunt.registerTask 'cov', ['jshint', 'shell:instrument', 'jasmine:coverage', 'shell:rm-instrumented']
