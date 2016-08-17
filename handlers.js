/*jslint node:true */
'use strict';

var aws = require('aws-sdk');
var logger = require('express-logger');

var firehose;

function _spewBeacon(req, res, beaconKeys, firehoseName) {
    res.sendStatus(200);
    var dataRecord = {};
    for (var key in req.query) {
        if (key in beaconKeys) {
            dataRecord[key] = req.query[key];
        }
    }
    if ('raw' in beaconKeys) {
        dataRecord.raw = req.query;
    }
    var record = {
        Record: {
            Data: JSON.stringify(dataRecord)
        },
        DeliveryStreamName: firehoseName
    };
    if (!firehose) {
        firehose = new aws.Firehose();
    }
    firehose.putRecord(record).promise().then(function(response) {
        logger.debug("putRecord finished with " + response);
    },
    function(err) {
        logger.error("pubRecord error " + err.message);
    });
}

exports.spewBeacon = _spewBeacon;
