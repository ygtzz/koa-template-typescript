"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const koaStatic = require("koa-static");
const bodyParser = require("koa-bodyparser");
const koaNunjucks = require("koa-nunjucks-2");
const koaCompress = require("koa-compress");
const config = require("./config");
const envCfg = config[config.env];
const app = new Koa();
if (config.gzip) {
    app.use(koaCompress({
        threshold: 1024
    }));
}
//静态文件
app.use(koaStatic(envCfg.staticDirectory));
//模板
app.use(koaNunjucks(config.template));
//请求参数解析
// Enable bodyParser with default options
app.use(bodyParser());
app.use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
app.listen(envCfg.port);
console.log('app start at port ' + envCfg.port + '...');
