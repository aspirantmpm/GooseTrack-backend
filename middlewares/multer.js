const multer = require("multer");

const storage = multer.diskStorage({});
const limits = { fileSize: 500000 };

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });
module.exports = upload;
