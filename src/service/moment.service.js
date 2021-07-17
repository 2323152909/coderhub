const connection = require('../app/database')

// const sqlFragment = `
//     SELECT 
//       m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
//       JSON_OBJECT('id', u.id, 'name', u.name) author
//     FROM moment m 
//     LEFT JOIN user u ON m.user_id = u.id 
// `;

class MommentService {
  async create(content, user_id) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const result = await connection.execute(statement, [content,user_id]);
    return result;
  }

  async getMomentById(momentId){
    const statement = `
      SELECT 
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name) author,
          IF(COUNT(l.id),
            JSON_ARRAYAGG(
              JSON_OBJECT('id', l.id, 'name', l.name)
              ),
            null) labels,
          (SELECT IF(COUNT(c.id),
            JSON_ARRAYAGG(
              JSON_OBJECT('id', c.id,'content', c.content, 'commentId', c.comment_id, 'creatTime', c.createAt,
                'user', JSON_OBJECT('id', c_u.id, 'name', c_u.name)
              )
            ),NULL)
            FROM comment c
            LEFT JOIN user c_u ON c.user_id = c_u.id
            WHERE c.moment_id = m.id
          )  comments 
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id 
      LEFT JOIN moment_label m_l ON m_l.moment_id = m.id
      LEFT JOIN label l ON l.id = m_l.label_id
      WHERE m.id = ?
      GROUP BY m.id;
    `;
    try {
      const [result] = await connection.execute(statement, [momentId]);
      return result[0];
    } catch (error) {
      console.log(error);
    }  
  }

  async getMomentList(offset, size){
    const statement = `
        SELECT 
          m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name) author,
          (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
          (SELECT COUNT(*) FROM moment_label m_l WHERE m_l.moment_id = m.id) labelCount
        FROM moment m 
        LEFT JOIN user u 
        ON m.user_id = u.id  
        LIMIT ?, ?;
    `;
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

  async hasLabel(momentId, labelId){
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    console.log(result);

    return result[0]? true: false;
  }

  async addLabels(momentId, labelId){
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [momentId, labelId])

    return result;
  }
}

module.exports = new MommentService();