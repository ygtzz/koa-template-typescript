import * as Router from 'koa-router';
import * as path from 'path';
import * as fs from 'fs';

import user from './controller/user';
import file from './controller/file';
import home from './controller/home';

const router = new Router();

// const routeMap = {
//     '/': {
//         redirect: '/user/profile'
//     },
//     '/user/login':{
//         method: 'post'
//     }
// }

//注册默认redirect
// Object.keys(routeMap).forEach(function(item){
//     const routeItem = routeMap[item];
//     if(routeItem.redirect){
//         console.log('route ',item,routeItem.redirect);
//         router.redirect(item,routeItem.redirect);
//     }
// });

//controller方法默认注册为get方法，routeMap声明的注册为对应方法
// const files = fWalk(path.join(__dirname,'./controller'));
// files.forEach(function(item){
//     item = path.basename(item);
//     const ext = path.extname(item);
//     const fileName = item.replace(new RegExp(ext+'$'),'');
//     const controller = require('./controller/' + item);
//     Object.keys(controller).forEach(function(method){
//         const key = '/' + fileName + '/' + method;
//         const routeItem = routeMap[key];
//         if(routeItem){
//             if(routeItem.method){
//                 router[routeItem.method](key, controller[method]);
//             }
//         }
//         else{
//             router.get(key, controller[method]);
//         }
//     });
// });


// const user = require('./controller/user');
// const file = require('./controller/file');

router.get('/',home.index);
router.post('/user/login',user.login);
router.get('/user/profile',user.profile);
router.get('/user/template',user.template);
router.get('/file/download',file.download);
router.get('/file/build',file.build);

export default router;

function fWalk(dir:string):string[]{
    var results:string[] = [];
    var list = fs.readdirSync(dir)
    list.forEach(function(file:string) {
        file = dir + '/' + file
        var stat = fs.statSync(file)
        if (stat && stat.isDirectory()) results = results.concat(fWalk(file))
        else results.push(file)
    })
    return results;
}