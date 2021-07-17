const Router = require('koa-router');

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');
const {create, detail, list, update, delMoment, addLabels, fileInfo} = require('../controller/moment.controller');
const { verifyLabelExists } = require('../middleware/label.middleware.js');

const momentRouter = new Router({prefix:"/moment"});

momentRouter.post('/', verifyAuth, create);

momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);

// 1.用户必须登录；2.用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, delMoment);

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels);

// 动态配图的服务
momentRouter.get('/images/:filename', fileInfo);

module.exports = momentRouter;