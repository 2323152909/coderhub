const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path')

dotenv.config(); //调用config就可以拿到.env文件里面的内容了

// console.log(process.env.MYSQL_DATABASE);
// console.log(process.env.MYSQL_HOST);
// console.log(process.env.MYSQL_PASSWORD);
// console.log(process.env.MYSQL_PORT);
// console.log(process.env.MYSQL_USER);
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;