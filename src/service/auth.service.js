const connection = require('../app/database');

class AuthService {
  async nameExists(name){
    const statement = `select * from user where name = ?;`
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async checkMoment(id, momentId){
    const statement = `select * from moment where id = ? and user_id = ?;`;
    const [result] = await connection.execute(statement, [momentId, id]);
    // console.log(result.length);
    return result.length === 0 ? false:true;
  }
}

module.exports = new AuthService()