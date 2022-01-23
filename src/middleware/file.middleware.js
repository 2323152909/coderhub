const Multer = require('koa-multer');
const Jimp = require('jimp');
const path = require('path');

const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path');


const avatarUpload = new Multer({
    dest: AVATAR_PATH
});

const avatarHandler = avatarUpload.single('avatar');

const pictureUpload = new Multer({
    dest: PICTURE_PATH
});

const pictureHandler = pictureUpload.array('picture', 9);

const pictureResize = async (ctx, next) => {
    try {
        // 1.获取所有的图像信息
        const files = ctx.req.files;
        // console.log(files);

        // 2.对图像进行处理(sharp(path).resize/jimp)
        for (let file of files) {
            const destPath = path.join(file.destination, file.filename);
            Jimp.read(file.path).then(image => {
                image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
                image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
                image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
            });
        }
        await next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
}