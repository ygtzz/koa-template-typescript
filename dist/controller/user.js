"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleep = async (ms) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, ms);
    });
};
exports.default = {
    login(ctx) {
        ctx.body = {
            username: ctx.request.body.username
        };
    },
    async template(ctx) {
        await ctx.render('user_template', {
            title: 'user template',
            name: '游客'
        });
    },
    async profile(ctx) {
        // await sleep(1000);
        ctx.body = {
            usename: '相学长',
            sex: 'man',
            age: '999'
        };
    },
};
