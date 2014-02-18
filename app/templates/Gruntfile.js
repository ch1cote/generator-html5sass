module.exports = function(grunt) {
  // configure the tasks
  grunt.initConfig({
   pkg: grunt.file.readJSON('package.json'),
   copy: {
    main: {
      expand: true,
      cwd: 'bower_components/html5-boilerplate/',
      src: ['**'],
      dest: 'app/'
    },
    secondary: {
      expand: true,
      cwd: 'bower_components/Sass-File-Structure/',
      src: ['**'],
      dest: 'app/'
    },
     html: {
        src: ['app/css/compiled/*', 'app/img/**', 'app/js/**'],
        dest: 'dist/'
      },
     img: {
        src: ['app/img/**'],
        dest: 'dist/'
     },
     js: {
        src: ['app/js/**'],
        dest: 'dist/'
     }

  },
    includereplace: {
    your_target: {
      options: {
        // Task-specific options go here.
      },
      // Files to perform replacements and includes with
      src: 'app/*.html',
      // Destination directory to copy files to
      dest: 'dist/'
    }
  },
  clean: {
    main: {
      src : ["app/html5-boilerplate/"]
    },
    secondary: {
      src : ["app/css/*.css"]
    }
  },

  replace: {
    css: {
      src: ['app/index.html'],
      overwrite: true,
      replacements: [{
        from: '<link rel="stylesheet" href="css/normalize.css">',
        to: ''
      }, {
        from: '<link rel="stylesheet" href="css/main.css">',
        to: '<link rel="stylesheet" href="css/compiled/main.css">'
      }]
    }
  },
   prettify: {
    options: {
      indent: 4,
    },
         all: {
        expand: true,
        cwd: 'dist/app/',
        ext: '.html',
        src: ['*.html'],
        dest: 'dist/app'
      }
    },

    //node sass
    sass: {
      php: {
          options: {
            sourceComments: 'map',
            sourceMap: 'main.css.map'
          },
          files: {
            'app/css/compiled/main.css': 'app/css/source/main.scss',
            'app/css/compiled/main-old-ie.css': 'app/css/source/main-old-ie.scss'
          }
      },
      html: {
        options: {
          sourceComments: 'map',
          sourceMap: 'main.css.map'
        },
        files: {
          'app/css/compiled/main.css': 'app/css/source/main.scss',
          'dist/app/css/compiled/main.css': 'app/css/source/main.scss',
          'app/css/compiled/main-old-ie.css': 'app/css/source/main-old-ie.scss',
          'dist/app/css/compiled/main-old-ie.css': 'app/css/source/main-old-ie.scss'      
        }
      }
      
    },

    //watch -- right now only sass
    watch: {
      options: {
        livereload: true
      },
       css: {
        files: ['app/css/source/*.scss'],
        tasks: ['sass:html']
      },
      html: {
        files: ['app/*.html'],
        tasks: ['includereplace']
      },
      img: {
        files: ['app/img/**.*'],
        tasks: ['copy:img']
      },
      js: {
        files: ['app/js/**.*'],
        tasks: ['copy:img']
      }
    },

  connect: {
    uses_defaults: {
      options: {
        livereload: true
      }
    }
  }



});

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-prettify');
  grunt.loadNpmTasks('grunt-include-replace');

  // define the tasks
  grunt.registerTask('default', ['copy', 'clean', 'replace','sass:php']);
  grunt.registerTask('nodeSass',['sass']);
  grunt.registerTask('serve',['execute']);
  grunt.registerTask('nodeWatch',['watch']);
  grunt.registerTask('setupPHP', ['copy:main','copy:secondary', 'clean', 'replace', 'sass:php', 'connect', 'watch'  ]);
  grunt.registerTask('setupHTML', ['includereplace','prettify','copy', 'clean', 'replace', 'sass:html', 'connect', 'watch'  ]);

};
