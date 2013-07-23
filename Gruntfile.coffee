
module.exports = (grunt) ->

  grunt.initConfig

    jshint:
      all: 'src/*.js'
      options:
        jshintrc: '.jshintrc'

    jasmine:
      all:
        src: ['src/straw-android.js', 'src/straw-android-plugin']
        options:
          specs: 'spec/*.js'

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['jshint', 'jasmine']
