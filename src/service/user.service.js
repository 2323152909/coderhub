const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user; 
    const statement = `insert into user (name,password) values (?, ?);`;

    try {
      const result = await connection.execute(statement, [name, password]);
      // 将user存储到数据库中
      return result[0];
    } catch (error) {
      console.log(error);
    }
    
  };

  async getUserByName(name) {
    const statement = `select * from user where name = ?;`;
    const result = await connection.execute(statement, [name])

    return result[0];
  }

  async updateAvatarUrlById(avatarUrl, userId){
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);

    return result;
  }
}

module.exports = new UserService();