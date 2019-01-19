"use strict";
const path = require("path");
const config = {
    env: process.env.NODE_ENV || 'development',
    gzip: false,
    template: {
        ext: 'njk',
        path: path.resolve('./dist/views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    },
    development: {
        port: 3100,
        staticDirectory: path.resolve('./dist/static')
    },
    production: {
        port: 80,
        staticDirectory: path.resolve('./dist/static')
    }
};
module.exports = config;
