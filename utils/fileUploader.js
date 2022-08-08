const cloudinary = require("cloudinary").v2;
require('dotenv').config()

const fileUploader = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
      return result ? resolve(result) : reject(error);
    });
  });
};

module.exports = {
  fileUploader,
};
