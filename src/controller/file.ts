import { Context } from 'koa';
import * as fs from 'fs';
import * as path from 'path';
import * as send from 'koa-send';
import * as archiver from 'archiver';

async function buildZip(base:string){
    const zipName = 'download.zip';
    const zipStream = fs.createWriteStream(zipName);
    const zip = archiver('zip');
    zip.pipe(zipStream);
    const zipBase = path.join(__dirname,'../..');
    // 打包文件方式
    const list = [
        {path: path.join(zipBase,'/src/controller/file.js'), name: 'file-download.js'},
    ];
    for (let i = 0; i < list.length; i++) {
        zip.append(fs.createReadStream(list[i].path), { name: list[i].name })
    }
    zip.directory('src/downloads/','');
   
    await zip.finalize();

    return zipName;
}

export default {
    async download(ctx:Context) {
        await ctx.render('download');
    },
    async build(ctx:Context) {
        console.log('user build');

        let base = 'downloads';

        const zipName = await buildZip(base);

        ctx.attachment(zipName);

        await send(ctx, zipName);
    }
}

