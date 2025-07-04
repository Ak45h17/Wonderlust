const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEYS,
    api_secret:process.env.CLOUD_API_SECREATE

})
// Set up Cloudinary storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'Wonderlust', // Your folder name in Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

module.exports = {
  cloudinary,
  storage,
};