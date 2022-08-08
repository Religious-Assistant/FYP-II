const cloudinary = require("cloudinary").v2;
require('dotenv').config()

const avatarUploader = (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.tempFilePath, {folder:'religious-assistant', overwrite:true}, (error, result) => {
      return result ? resolve(result) : reject(error);
    });
  });
};

const avatarRemover = (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy("religious-assistant/"+public_id, {invalidate:true, resource_type:'image'}, (error, result) => {
      return result ? resolve(true) : reject(false);
    });
  });
};

const getPublicId=(url)=>{
  let public_id=url.split("/")
  return public_id[public_id.length-1].split(".")[0]
}

module.exports = {
  avatarUploader,
  avatarRemover,
  getPublicId
};
