const path = require('path');

const config = {
    env: process.env.NODE_ENV || 'development',
    gzip: false,
    template:{
        ext:'njk',
        path: path.join(__dirname,'./src/views'),
        nunjucksConfig: {
            trimBlocks: true
        }
    },
    development:{
        port: 3100,
        staticDirectory: path.join(__dirname,'./src/static')
    },
    production:{
        port: 80,
        staticDirectory: path.join(__dirname,'./src/static')
    }
}

export default config;