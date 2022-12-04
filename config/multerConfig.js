const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {

    const fileExt = file.originalname.split('.')[1];

    const fileName = require('crypto')
      .randomBytes(8)
      .toString('hex');

    cb(null, `${fileName}.${fileExt}`)
  }
});

module.exports = storage;