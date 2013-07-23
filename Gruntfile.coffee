
module.exports = (grunt) ->

  grunt.initConfig

    jshint:
      all: 'src/*.js'
      options:
        jshintrc: '.jshintrc'


  grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'default', ['jshint']
