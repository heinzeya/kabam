module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: {
        src: ['Gruntfile.js', 'index.js', 'example/**/*.js', 'test/**/*.js']
      },
      ci: {
        options: {
          force: true,
          reporter: 'checkstyle',
          reporterOutput: 'results/jshint-result.xml'
        },
        src: '<%= jshint.all.src %>'
      }
    },
    simplemocha: {
      options: {
        globals: ['should'],
        ignoreLeaks: false,
        ui: 'bdd'
      },
      all: {
        options: {
          reporter: 'spec'
        },
        src: [
          'test/**/*.js',
          'node_modules/kabam-kernel/test/**/*.js',
          'node_modules/kabam-plugin-hogan/test/**/*.js',
          'node_modules/kabam-plugin-private-message/test/**/*.js',
          'node_modules/kabam-plugin-notify-email/test/**/*.js',
          'node_modules/kabam-plugin-my-profile/test/**/*.js',
          'node_modules/kabam-plugin-welcome/test/**/*.js',
          'node_modules/kabam-plugin-rest/test/**/*.js',
          'node_modules/kabam-plugin-spine/test/**/*.js'
        ]
      },
      ci: {
        options: {
          reporter: 'tap'
        },
        src: '<%= simplemocha.all.src %>'
      }
    },
    clean: {
      docs: [ 'results/docs' ]
    },
    copy: {
      readme: {
        src: 'README.md',
        dest: 'results/index.ngdoc'
      }
    },
    ngdocs: {
      options: {
        dest: 'results/docs',
        title: 'KabamKernel',
        startPage: '/api'
      },
      api: {
        src: [
          'results/index.ngdoc',
          'node_modules/kabam-kernel/bins/*.js',
          'node_modules/kabam-kernel/example/*.js',
          'node_modules/kabam-kernel/lib/*.js',
          'node_modules/kabam-kernel/models/userModel.js',
          'node_modules/kabam-kernel/index.js',
          'node_modules/kabam-kernel/example/plugin.example.js',
          'node_modules/kabam-plugin-hogan/index.js',
          'node_modules/kabam-plugin-my-profile/index.js',
          'node_modules/kabam-plugin-notify-email/index.js',
          'node_modules/kabam-plugin-private-message/index.js',
          'node_modules/kabam-plugin-rest/index.js',
          'node_modules/kabam-plugin-spine/index.js',
          'node_modules/kabam-plugin-spine/welcome.js',
        ],
        title: 'Kabam API With plugins'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-ngdocs');

  // Tasks
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('testci', ['simplemocha:ci']);
  grunt.registerTask('docs', ['clean:docs', 'copy:readme', 'ngdocs']);
  // Default task.
  grunt.registerTask('default', ['jshint', 'test']);

};
