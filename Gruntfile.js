module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        files: {'dist/css/style.css': 'stylesheets/style.scss'}
      }
    },
   jade: {
      dist: {
        files: [ {
          expand: true,
          cwd: 'pages',
          src: ['*.jade'],
          dest: 'dist/',
          rename: function(base, path) {
            return base + path.replace(/\.jade$/, '.html');
          }
        } ]
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      files: ['pages/**/*', 'js/**/*', 'stylesheets/**/*'],
      tasks: ['sass', 'jade'],
    },
  });
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'jade']);
};