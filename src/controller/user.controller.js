const userService = require('../service/user.service');
const fileService = require('../service/file.service');
const fs = require('fs');
const { AVATAR_PATH } = require('../constants/file-path');

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await userService.create(user);

    // 返回数据
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    // 1.获取用户信息
    const {userId} = ctx.params;

    const avatarInfo = await fileService.getAvatarInfoByUserId(userId);

    // 2.提供图像信息
    ctx.response.set('content-type', avatarInfo.mimetype); // 设置内容响应格式
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`); //单写这一行，没有设置响应输出格式，浏览器会自动下载该文件
  }
}


module.exports = new UserController();