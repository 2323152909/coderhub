const Multer = require('koa-multer');
const { AVATAR_PATH } = require('../constants/file-path');


const avatarUpload = new Multer({
  dest:AVATAR_PATH
});

const avatarHandler = avatarUpload.single('avatar');

module.exports = {
  avatarHandler
}