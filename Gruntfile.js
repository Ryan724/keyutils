module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'libs/keyutils.js',
        dest: 'libs/keyutils.min.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['uglify']);
}