/*jslint node:true */
'use strict';

var aws = require('aws-sdk');
var fs = require('fs');
var handlers = require('./handlers');
var logger = require('express-logger');
var path = require('path');

function _reset(app) {
    var config_dir;
    if (process.env.ENVCONFIG_DIR) {
        config_dir = process.env.ENVCONFIG_DIR;
        if (!config_dir.endsWith('/')) {
            config_dir = config_dir + '/';
        }
    } else {
        config_dir = './';
    }
    var config = JSON.parse(fs.readFileSync(path.join(
                    config_dir, 'config.json')));

    aws.config.update(config.AWS_config);

    if (config.beacons && app) {
        // Setup paths.
        for (var i = 0; i < config.beacons.length; i++) {
            var beacon = config.beacons[i];
            // turn the keys into a map we can search O(1)
            var beaconKeys = beacon.keys.reduce(function(prev, current) {
                prev[current] = true;
                return prev;
            }, {});
            var firehoseName = beacon.firehose;
            app.get(/beacon\/(.*)$/,
                    /* jshint loopfunc: true */
                    function(req, res) {
                        return handlers[beacon.action](
                                req,
                                res,
                                beaconKeys,
                                firehoseName);
                    });
        }
    }
}

exports.reset = _reset;
