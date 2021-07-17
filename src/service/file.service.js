const connection = require('../app/database');

class FileService {
  async createAvatar(filename, mimetype, size, userId){
    const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
    return result;
  }

  async getAvatarInfoByUserId(userId){
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [result] = await connection.execute(statement, [userId]);

    return result[0];
  }

  async createPicture(filename, size, mimetype,momentId, userId){
    const statement = `INSERT INTO file (filename, size, mimetype,moment_id, user_id) VALUES (?, ?, ?, ?, ?);`;
    const [result] = await connection.execute(statement, [filename, size, mimetype,momentId, userId]);

    return result;
  }

  async getFileInfoByFilename(filename){
    const statement = `SELECT * FROM file WHERE filename = ?;`;
    const [result] = await connection.execute(statement, [filename]);

    return result[0];
  }
}

module.exports = new FileService();