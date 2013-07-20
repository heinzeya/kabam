module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      all: {
        src: ['*.js']
      },
      ci: {
        options: {
          force: true,
          reporter: 'checkstyle',
          reporterOutput: 'jshint-result.xml'
        },
        src: '<%= jshint.all.src %>'
      }
    },
    vows: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: '**/*.test.js'
      },
      ci: {
        options: {
          reporter: 'xunit'
        },
        src: '**/*.test.js'
      }

    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-vows');

  grunt.registerTask('test', 'vows:all');
  // Default task.
  grunt.registerTask('default', ['jshint:all']);

};
