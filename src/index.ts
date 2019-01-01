// const path = require('path');
// const Koa = require('koa');
// const router = require('./router');
// const koaNunjucks = require('koa-nunjucks-2');

// const static = require('koa-static');
// const gzip = require('koa-gzip');
// const config = require('../config');

/// <reference path="../typings/index.d.ts" />

import * as path from 'path';
import * as Koa from 'koa';
import router from './router';
import * as koaStatic from 'koa-static';
import * as bodyParser from 'koa-bodyparser';
import * as koaNunjucks from 'koa-nunjucks-2';
import * as koaCompress from 'koa-compress';
import {config} from '../config';

const envCfg = config[config.env];
const app = new Koa();


// if(config.gzip){
//    app.use(koaCompress({
//       threshold: 1024
//    }));
// }

//静态文件
app.use(koaStatic(envCfg.staticDirectory));

//模板
app.use(koaNunjucks(config.template));

//请求参数解析
// Enable bodyParser with default options
app.use(bodyParser());

app.use(router.routes())
   .use(router.allowedMethods());


app.listen(envCfg.port);

console.log('app start at port ' + envCfg.port + '...');