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
        scripts: {
            files: ['app/css/source/*.scss','app/*.html'],
            tasks: ['nodeSass'],
            options: {
                 spawn: false,
                 livereload: true
            }
        }
    },

  execute: {
      target: {
          src: ['server-live.js']
      }
  }

  });

  // load the tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-execute');

  // define the tasks
    grunt.registerTask('default', ['copy', 'clean']);
    grunt.registerTask('nodeSass',['sass']);
    grunt.registerTask('serve',['execute']);
    grunt.registerTask('nodeWatch',['watch']);
    grunt.registerTask('setup', ['copy', 'clean']);

};
