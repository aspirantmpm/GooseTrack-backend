const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_NAME',
  api_secret: 'YOUR_API_SECRET',
});

module.exports = cloudinary;
