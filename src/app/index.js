const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const errorHandler = require('./error.handle');
const useRoutes = require('../router/index')

const app = new Koa();


app.use(bodyParser()); //对json数据进行解析

app.useRoutes = useRoutes;
app.useRoutes();
// useRoutes(app);

app.on('error', errorHandler)

module.exports = app