const fileService = require('../service/file.service.js');

class FileController {
  async saveAvatarInfo(ctx, next){
    // 1.获取到图片相关的信息（注意，上传文件在ctx.req.file中）
    const {filename, mimetype, size} = ctx.req.file;
    const {id} = ctx.user;
    // console.log(ctx.req.file);

    // 2.将图像信息数据保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id);

    ctx.body = result;
  }
}

module.exports = new FileController();