const Router = require('koa-router');

const { create } = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/users'});
// 路径一：
userRouter.post('/', verifyUser, handlePassword, create);

module.exports = userRouter;