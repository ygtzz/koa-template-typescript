import { Context } from 'koa';

const sleep = async (ms:number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        },ms)
    })
}

export default {
    login(ctx:Context){
        ctx.body = {
            username: ctx.request.body.username
        }
    },
    async template(ctx:Context){
        await ctx.render('user_template',{
            title: 'user template',
            name: '游客'
        });
    },
    async profile(ctx:Context){
        // await sleep(1000);
        ctx.body = {
            usename: '相学长',
            sex: 'man',
            age: '999'
        }
    },
}
