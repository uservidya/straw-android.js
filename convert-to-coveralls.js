#! /usr/bin/env node

/**
 * take jscoverage data from stdin
 * and output coveralls.io json to stdout
 */

var SOURCE_DIR = './';
var SERVICE_NAME = 'travis-ci';
var JOB_ID = process.env.TRAVIS_JOB_ID;

var readline = require('readline');
var fs = require('fs');

var reCoverageLine = /^coverage:(.*)/;

exports.main = function (done, logger) {
    'use strict';

    var coverage;

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', function (line) {
        var match = reCoverageLine.exec(line);

        if (match) {
            var data;

            try {
                data = JSON.parse(match[1]);
                coverage = Coverage.createFromJscoverage(data, SERVICE_NAME, JOB_ID);

            } catch (e) {
                logger('coverage data broken');
                logger(e);
            }
        }
    });

    rl.on('close', function () {
        if (coverage != null) {
            logger(coverage.toCoverallsJson());
        };

        done();
    });
};

var Coverage = (function () {
    'use strict';

    var Coverage = function (files, service_name, job_id) {
        this.files = files;
        this.service_name = service_name;
        this.job_id = job_id;
    };

    Coverage.createFromJscoverage = function (data, service_name, job_id) {
        var files = [];

        Object.keys(data).forEach(function (file) {
            var cov = data[file];

            files.push({
                name: file,
                coverage: cov,
                source: Coverage.readFile(file)
            });
        });

        return new Coverage(files, service_name, job_id);
    };

    Coverage.readFile = function (file) {
        return fs.readFileSync(SOURCE_DIR + file).toString();
    };

    var coveragePt = Coverage.prototype;

    coveragePt.toCoverallsFormat = function () {
        return {
            service_job_id: this.job_id,
            service_name: this.service_name,
            source_files: this.files
        };
    };

    coveragePt.toCoverallsJson = function () {
        return JSON.stringify(this.toCoverallsFormat());
    };

    return Coverage;
}());

exports.main(function () {}, function (log) {
    console.log(log);
});
