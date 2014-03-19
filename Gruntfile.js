module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    compass: {
      dist: {
        options: {
          config: 'config.rb',
          sassDir: 'sass',
          cssDir: 'css/build',
          require: 'sass-globbing'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      no_dest: {
        src: 'css/build/style.css'
      }
    },

    cssmin: {
      combine: {
        files: {
          'css/build/min/style.min.css': ['css/build/*.css']
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
          src: ['**/*.{png,jpg}'], // leave gifs alone!
          dest: 'img/'
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      html: {
        files: ['index.html'],
      },
      scripts: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['sass/**/*.scss'],
        tasks: ['compass', 'autoprefixer', 'cssmin' ],
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
  grunt.registerTask('default', ['concat', 'uglify', 'compass', 'autoprefixer', 'cssmin', 'imagemin']);

  grunt.registerTask('dev', ['connect', 'watch']);

};