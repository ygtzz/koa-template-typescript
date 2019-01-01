"use strict";
// const path = require('path');
// const Koa = require('koa');
// const router = require('./router');
// const koaNunjucks = require('koa-nunjucks-2');
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const gzip = require("koa-gzip");
const config_1 = require("../config");
const envCfg = config_1.config[config_1.config.env];
const app = new Koa();
if (config_1.config.gzip) {
    app.use(gzip());
}
//静态文件
app.use(koaStatic(envCfg.staticDirectory));
//模板
// app.use(koaNunjucks(config.template));
//请求参数解析
// Enable bodyParser with default options
app.use(bodyParser());
app.use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
app.listen(envCfg.port);
console.log('app start at port ' + envCfg.port + '...');
//# sourceMappingURL=index.js.map