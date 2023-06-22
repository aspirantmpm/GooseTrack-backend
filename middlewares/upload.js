const multer = require('multer');
const path = require('path');
// const { HttpError } = require('../helpers');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

const destination = path.join(__dirname, '../', 'temp');

const multerConfig = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploder = multer({
  storage: multerConfig,
});

module.exports = uploder;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'avatars',
  allowedFormats: ['jpg', 'png', 'svg'],
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const newName = `${uniquePrefix}_${file.originalname}`;
    cb(null, newName);
  },
});

// const limits = {
//   fileSize: 1024 * 1024,
// };

// const fileFilter = (req, file, cb) => {
//   const { mimetype } = file;
//   if (mimetype !== 'image/jpeg' || mimetype !== 'image/png') {
//     cb(HttpError(400, 'File can have only .jpg or .png extension'));
//   }
//   cb(null, true);
// };

const upload = multer({
  storage,
  uploder,
  cloudinary,
});

module.exports = upload;
// const uploadCloud = multer({ storage });

// module.exports = { uploadCloud, uploder, cloudinary };
