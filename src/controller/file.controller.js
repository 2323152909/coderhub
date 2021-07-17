const fileService = require('../service/file.service.js');
const userService = require('../service/user.service');
const { AVATAR_PATH } = require('../constants/file-path');
const { APP_HOST, APP_PORT } = require('../app/config');

class FileController {
  async saveAvatarInfo(ctx, next){
    // 1.获取到图片相关的信息（注意，上传文件在ctx.req.file中）
    const {filename, mimetype, size} = ctx.req.file;
    const {id} = ctx.user;
    // console.log(ctx.req.file);

    // 2.将图像信息数据保存到数据库中
    await fileService.createAvatar(filename, mimetype, size, id);
    console.log("到这里");

    // 3.将图片地址保存到user表中
    try {
      const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
      await userService.updateAvatarUrlById(avatarUrl, id);

      // 4.返回结果
      ctx.body = "用户上传头像成功~";
    } catch (error) {
      console.log(error);
    }  
  }

  async savePictureInfo(ctx, next){
    // 获取图片信息
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;

    // 2.将所有的图片信息保存到数据库中
    for(let file of files){
      const { filename, mimetype, size } = file;
      await fileService.createPicture(filename, size, mimetype,momentId, id);
    }

    ctx.body = "动态配图上传完成~";
  }
}

module.exports = new FileController();