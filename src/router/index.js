const fs = require('fs')

// 将所有的路由通过文件读取的方式进行注册
const useRoutes = function() {
  fs.readdirSync(__dirname).forEach(file => {
    if(file == 'index.js') return;
    const router = require(`./${file}`);
    this.use(router.routes());
    this.use(router.allowedMethods())
  })
}

// const useRoutes = (app) => {
//   fs.readdirSync(__dirname).forEach(file => {
//     if(file == 'index.js') return;
//     const router = require(`./${file}`);
//     app.use(router.routes());
//     app.use(router.allowedMethods())
//   })
// }

module.exports = useRoutes