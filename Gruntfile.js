'use strict';

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-run');

    var process = require('child_process');

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            all: [
                'js/supervisor/*.js',
                'js/**/*.js',
                'tests/**/*.js',
            ],
        },
        run: {
            server: {
                cmd: 'node',
                args: ['app.js']
            },
            'test-client': {
                cmd: './node_modules/.bin/phantomjs',
                args: ['test.js']
            },
            'test-unit': {
                cmd: './node_modules/.bin/jasmine-node',
                args: ['tests/unit/commitAsset.spec.js',
                    'tests/unit/creativeAsset.spec.js', 'tests/unit/rid.spec.js']
            },
            'test-integration': {
                cmd: './node_modules/.bin/jasmine-node',
                args: ['tests/run-spec.js', '--junitreport', '--output', '_build']
            },
        }
    });
    grunt.registerTask('default', ['run:test-unit', 'run:server']);
    grunt.registerTask('start', ['run:server']);
    grunt.registerTask('build', ['test']);
    grunt.registerTask('test', ['run:test-unit', 'run:test-client']);
};
