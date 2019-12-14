import { Context } from 'koa';

export default {
    async index(ctx:Context){
        await ctx.render('home',{
            title: 'home',
            name: '游客'
        });
    }
}
