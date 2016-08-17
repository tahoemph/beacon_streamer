/*jslint node:true */
'use strict';
var configure = require('./configure');
var http = require('http');
var express = require('express');
var logger = require('express-logger');

var app = express();

app.set('port', process.env.PORT || 8000);
app.set('etag', false);
app.use(logger({ path: 'debuglog.txt' }));

app.use(function (req, res, next) {
  res.header('Cache-Control', 'max-age=3600');
  next();
});

configure.reset(app);

var server = http.createServer(app);
server.listen(
    app.get('port'),
    function () {
        console.info('Express server listening on port ' + app.get('port'));
    });
