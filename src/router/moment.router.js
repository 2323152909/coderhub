const Router = require('koa-router');

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');
const {create, detail, list, update, delMoment} = require('../controller/moment.controller')

const momentRouter = new Router({prefix:"/moment"});

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);
// 1.用户必须登录；2.用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, delMoment);

module.exports = momentRouter;