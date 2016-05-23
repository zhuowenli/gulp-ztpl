'use strict';

var fs = require('fs');
var path = require('path');
var TmodJS = require("./lib/tmodjs");

var through = require('through2');
var gutil = require('gulp-util');

var PLUGIN_NAME = 'gulp-tmod';

module.exports = function(opts) {
	var opts = opts || {};

	var base = path.resolve(opts.base || './');

	var paths = [];

	return through.obj(function(file, encoding, cb){
		var that = this;

		if(file.isNull()) {
			this.push(file);
			return cb();
		}

		paths.push(path.normalize(path.relative(base, file.path)));

		this.push(file);
		cb();

	}, function(cb){
		if(paths.length === 0) {
			return cb();
		}

		var tmod = new TmodJS(base, opts);
    var that = this;

    tmod.on('compile', function (error, data) {
    	if (error) {
		    that.emit('error', new gutil.PluginError(PLUGIN_NAME, error));//throw tmodjs error
		    return cb();
    	}
			cb(); //type非defaut时无法正常结束;
    });


    tmod.on('combo', function (error, data) {
    	if (!error) {
    		var comboFile = path.relative('./', data.outputFile);
    		gutil.log('File "' + comboFile + '" created.');
    		cb();
    	}
    });

    tmod.on('debug', function (error) {
    	return cb();
    });
    tmod.compile(paths);
	});
}
