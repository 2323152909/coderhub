const service = require('../service/comment.service.js');

class CommentController {
  async create(ctx, next){
    const {momentId, content} = ctx.request.body;//获取到动态id和评论内容
    const {id} = ctx.user; //获取到用户id
    console.log(momentId);
    console.log(content);
    console.log(ctx.user);

    const result = await service.create(momentId, content, id);

    ctx.body = result;
  }

  async reply(ctx, next){
    const { commentId } = ctx.request.params;
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;

    const result = await service.reply(momentId, commentId, content, id);

    ctx.body = result;
  }

  async update(ctx, next){
    const {commentId} = ctx.request.params;
    const {content} = ctx.request.body;
    const {id} = ctx.user;
    
    const result = await service.update(commentId, content);

    ctx.body = result;
  }

  async remove(ctx, next) {
    const {commentId} = ctx.request.params;

    const result = await service.remove(commentId);

    ctx.body = result;
  }
}

module.exports = new CommentController();