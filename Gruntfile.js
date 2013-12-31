module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded', // we'll compress it later
          require: 'sass-globbing',
          compass: true
        },
        files: {
          'css/build/style.min.css': 'sass/style.scss'
        },
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'css/build/*.css',
        dest: 'css/build/prefixed/'
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/build/min/style.min.css': ['css/build/prefixed/*.css']
        }
      }
    },

    jshint: {
      beforeconcat: ['js/*.js']
    },

    concat: {
      dist: {
        src: [
          'js/vendor/*.js',
          'js/scripts.js'
        ],
        dest: 'js/build/scripts.js'
      }
    },

    uglify: {
      build: {
        src: 'js/build/scripts.js',
        dest: 'js/build/scripts.min.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'img/'
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['sass/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin'],
        options: {
          spawn: false
        }
      },
      images: {
        files: ['img/**/*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }

    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: './',
          livereload: true
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['concat', 'uglify', 'sass', 'imagemin']);

  grunt.registerTask('dev', ['connect', 'watch']);

};