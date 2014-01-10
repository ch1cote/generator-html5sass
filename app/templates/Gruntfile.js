module.exports = function(grunt) {
  // configure the tasks
  grunt.initConfig({

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

    //node sass
    sass: {
      dev: {
        files: {
          'app/css/compiled/main.css': 'app/css/source/main.scss',
          'app/css/compiled/main-old-ie.css': 'app/css/source/main-old-ie.scss'
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
        tasks: ['nodeSass']
      },
      html: {
        files: ['app/*.html']
      },
      img: {
        files: ['app/img/**.*']
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

  // define the tasks
  grunt.registerTask('default', ['copy', 'clean', 'replace','sass']);
  grunt.registerTask('nodeSass',['sass']);
  grunt.registerTask('serve',['execute']);
  grunt.registerTask('nodeWatch',['watch']);
  grunt.registerTask('setup', ['copy', 'clean', 'replace', 'sass', 'connect', 'watch'  ]);

};
