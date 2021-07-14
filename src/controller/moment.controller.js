const service = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    // 1.获取数据（content, user_id）
    const user_id = ctx.user.id;
    const content = ctx.request.body.content;

    // 2.将数据插入到数据库
    const result = await service.create(content, user_id);
    ctx.body = result;
  }

  async detail(ctx, next){
    // 1.获取到参数
    const momentId = ctx.request.params.momentId;
    console.log(momentId);
    // 2.根据id查找对应的动态
    const result = await service.getMomentById(momentId);
    console.log(result);
    ctx.body = result;
  }

  async list(ctx, next){
    // 1.获取数据（offset/size）
    const {offset, size} = ctx.request.query;
    console.log(offset);
    console.log(size);

    // 2.根据数据查询列表
    const result = await service.getMomentList(offset, size);
    ctx.body = result;
  }

  async update(ctx, next) {
    // 1.获取参数
    const {momentId} = ctx.request.params;
    const {content} = ctx.request.body;

    // 2.修改内容
    const result = await service.updateMomentById(momentId, content);

    ctx.body = result;
  }

  async delMoment(ctx, next) {
    // 1.获取参数
    const {momentId} = ctx.request.params;
    
    // 2.删除内容
    const result = await service.delMomentById(momentId);

    ctx.body = result;
  }
}

module.exports = new MomentController();