const jwt = require('jsonwebtoken');

const service = require('../service/auth.service');
const errorTypes = require('../constants/error-types');
const { md5password } = require('../utils/password-handle');
const { PUBLIC_KEY } = require('../app/config');

const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名好密码是否为空
  if(!name || !password){
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx)
  }

  // 3.判断用户是否存在（用户不存在）
  const result = await service.nameExists(name);
  const user = result[0];
  console.log(user);
  if(!user){
    console.log('查无此人');
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx)
  }

  // 4.判断密码是否与数据库中的密码是一致的（加密）
  if(md5password(password) !== user.password){
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user;

  await next();
}

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware~");
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if(!authorization){
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '')

  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.eimt('error', error, ctx);
  }
}

/**
 * 1.很多内容都需要验证权限：修改/删除动态，修改/删除评论
 * 2.接口：业务接口系统/后端管理系统
 *  一对一：user -> role
 *  多对多：role -> menu(删除动态/修改动态)
 */

const verifyPermission = async (ctx, next) =>{
  console.log("验证修改权限的middleware~");
  // 1.获取到用户id和要修改的数据momentId
  const {momentId} = ctx.request.params;
  const {id} = ctx.user;

  // 2.通过数据momentId查找其对应的用户user_id是否与登录用户id相等
  const result = await service.checkMoment(id, momentId);

  if(!result){
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
}


module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}