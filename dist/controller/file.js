"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const send = require("koa-send");
const archiver = require("archiver");
async function buildZip(base) {
    const zipName = 'download.zip';
    const zipStream = fs.createWriteStream(zipName);
    const zip = archiver('zip');
    zip.pipe(zipStream);
    const zipBase = path.join(__dirname, '../..');
    // 打包文件方式
    const list = [
        { path: path.join(zipBase, '/dist/controller/file.js'), name: 'file-download.js' },
    ];
    for (let i = 0; i < list.length; i++) {
        zip.append(fs.createReadStream(list[i].path), { name: list[i].name });
    }
    zip.directory('dist/downloads/', '');
    await zip.finalize();
    return zipName;
}
exports.default = {
    async download(ctx) {
        await ctx.render('download');
    },
    async build(ctx) {
        console.log('user build');
        let base = 'downloads';
        const zipName = await buildZip(base);
        ctx.attachment(zipName);
        await send(ctx, zipName);
    }
};
