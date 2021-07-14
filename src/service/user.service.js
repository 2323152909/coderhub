const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user; 
    const statement = `insert into user (name,password) values (?, ?);`;

    const result = await connection.execute(statement, [name, password]);
    // 将user存储到数据库中
    return result[0];
  };

  async getUserByName(name) {
    const statement = `select * from user where name = ?;`;
    const result = await connection.execute(statement, [name])

    return result[0];
  }
}

module.exports = new UserService();