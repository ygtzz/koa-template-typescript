import * as path from 'path';

interface Config{
    [key:string]: any
}

const config:Config = {
    env: process.env.NODE_ENV || 'development',
    gzip: false,
    template:{
        ext:'njk',
        path: path.resolve('./dist/views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    },
    development:{
        port: 80,
        staticDirectory: path.resolve('./dist/static')
    },
    production:{
        port: 80,
        staticDirectory: path.resolve('./dist/static')
    }
}

export = config;