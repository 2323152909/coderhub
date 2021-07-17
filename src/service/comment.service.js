const connection = require('../app/database');

class CommentService {
  async create(momentId, content, userId){
    const statement = `INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId]);
    return result;
  }

  async reply(momentId, commentId, content, userId){
    const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId, commentId]);

    return result;
  }

  async update(commentId, content){
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [content, commentId]);

    return result;
  }

  async remove(commentId){
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }

  async getCommentsByMomentId(momentId){
    const statement = `
      SELECT  
        c.id, c.content, c.comment_id commentId, c.createAt createTime, 
        JSON_OBJECT('id', u.id, 'name', u.name) user
      FROM comment c
      LEFT JOIN user u ON u.id = c.user_id
      WHERE c.moment_id = ?;
    `;
    const [result] = await connection.execute(statement, [momentId]);

    return result;
  }
}

module.exports = new CommentService();