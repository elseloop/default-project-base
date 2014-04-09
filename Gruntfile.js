module.exports = function(grunt) {

  /**
   *
   * OVERVIEW
   *  
   * All of the following tasks can be run individually, if needed, by running grunt {task_name} or all together by running 'grunt dev' from the command line.
   * 
   * The default 'grunt' task will do everything listed except start the livereload server (connect task) or poll your files for changes (watch task). So, it'll generate all deployable assets and compress what needs compressing.
   *
   * 
   * TASK BREAKDOWN
   *
   * Sass tasks: 
   *   1. sass: concatenates your Sass files, processes them to CSS, and puts the output .css file in the build directory; includes Compass support by default
   *   2. autoprefixer: adds any broswer prefixes you might need, with support for last two verisons; runs on the CSS file output from #1 and returns it to the same place
   *   3. cssmin: minifies your CSS file for deployment and puts it in a the build/min directory
   *
   * 
   * Javascript tasks:
   *   1. jshint: lints your main scripts file; you can control what sort of checks it runs by adding tests to the options array (more info: http://www.jshint.com/)
   *   2. concat: makes all of your vendor plugins a single file
   *   3. uglify: minifies your final js files for deployment.
   *
   * 
   *  Image task:
   *   1. imagemin: compresses jpg, png, or gif files in /images so we're serve smaller files
   *
   *  Livereload task:
   *    1. connect: this starts up a server on your machine to connect with the Livereload engine. Defaults to port :8000, but you can use whatever you want. There's a Livereload app and a browser extension; the extension is free and easy, so most of the time you're cool just using that. Just remember to start it up on the site ( just click the icon in your browser's url bar).
   *    
   *  Watch:
   *    Polls for changes in your php, html, sass, and js files and on save runs all of the above in order and refreshes the browser (assuming Livereload is running). If you need to watch other file types, it likely supports them (especially if you don't need to run tasks on them).
   *
   * 
  **/


  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // set up sass task for initial sass processing
    // all scss partials/libs should be imported into style.scss
    sass: {
      dist: {
        options: {
          style: 'expanded', // we'll compress it later
          compass: true,
          loadPath: require('node-neat').includePaths
        },
        files: {
          // destination : source
          'css/build/style.css': 'sass/style.scss'
        },
      }
    },

    // add in any missed browser prefixes
    autoprefixer: {
      options: {
        browsers: ['last 2 version']
      },
      no_dest: {
        // we're just going to run autoprefixer, add what needs to be added, then put the file back where we found it. No need to build a new file for this.
        src: 'css/build/style.css'
      }
    },

    // minify all of it
    cssmin: {
      combine: {
        files: {
          // destination : source
          'css/build/min/style.min.css': ['css/build/style.css']
        }
      }
    },

    // lint all your organic, handcrafted, artisinal javascripts
    // not linting vendor files or modernizr, as we'll assume they're
    // either fine to begin with or already minified and therefore
    // not optimal for linting
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        },
      },
      beforeconcat: ['js/scripts.js']
    },

    // concatenate any plugins or libraries in /vendor with your scripts
    concat: {
      dist: {
        // you can unglob these if you want and pass in each specific file inside the array; if you do, the file order of the array you write here will be respected by Grunt in the resulting destination file, so if you want to ensure plugin-x.js is lways first in your build, put it first in the array
        src: [
          'js/vendor/*.js',
          'js/scripts.js'
        ],
        dest: 'js/build/scripts.js'
      }
    },

    // minify our js
    uglify: {
      build: {
        src: 'js/build/scripts.js',
        dest: 'js/build/scripts.min.js'
      }
    },

    // compress theme images
    // shrinks image files & returns them lighter,
    // newer and refreshed, smelling of spring
    // and childhood. This supports png, jpg, & gif.
    // If you have svgs too, you'll want to look
    // at something like grunt-svgmin:
    // https://github.com/sindresorhus/grunt-svgmin
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

    // Let's automate everything above this into one monster task!
    watch: {

      // automagically reload your page, because obviously
      // set it here once for all tasks
      options: {
        livereload: true,
      },
      // watch for saved changes in html files
      html: {
        files: ['*.html']
      },
      // watch for saved changes in php files
      php: {
        files: ['*.php', '**/*.php']
      },
      
      // javascript files
      // by default only watching your scripts
      // add the plugin directory to the files array if you want it
      scripts: {
        files: ['js/*.js'],
        tasks: [ 'jshint', 'concat', 'uglify' ],
        options: {
          spawn: false
        }
      },
      // when there's a saved changes in sass files, process it
      sass: {
        files: ['sass/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin'],
      },
      // when the processed file is overwritten, fire reload
      css: {
        files: ['css/build/min/style.min.css'],
        options: {
          spawn: false
        }
      },
      // process image files
      images: {
        files: ['img/**/*.{png,jpg,gif}', 'img/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }

    },

    // livereload port can be changed to whatever...
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
  
  // this allows easier task management
  // see https://github.com/sindresorhus/load-grunt-tasks for details
  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', [ 'jshint', 'concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'imagemin']);

  // dev task does it all, polls for updates, and starts up the livereload server
  grunt.registerTask('dev', ['connect', 'watch']);

};