const connection = require('../app/database')

const sqlFragment = `
    SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author
    FROM moment m 
    LEFT JOIN user u ON m.user_id = u.id 
`;

class MommentService {
  async create(content, user_id) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const result = await connection.execute(statement, [content,user_id]);
    return result;
  }

  async getMomentById(momentId){
    const statement = `${sqlFragment} WHERE m.id = ?;`;
    const [result] = await connection.execute(statement, [momentId]);
    return result[0];
  }

  async getMomentList(offset, size){
    const statement = `${sqlFragment} LIMIT ?, ?;`;
    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }

  async updateMomentById(momentId, content){
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [content, momentId]);
    return result[0];
  }

  async delMomentById(momentId){
    const statement = `DELETE FROM moment WHERE id = ?; `;
    const result = await connection.execute(statement, [momentId]);
    return result[0];
  }
}

module.exports = new MommentService();