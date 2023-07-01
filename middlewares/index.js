const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const cloudinary = require("./cloudinary");
const uploader = require("./multer");
const passport = require("./passport");
module.exports = {
  validateBody,
  isValidId,
  authenticate,
  cloudinary,
  uploader,
  passport,
};
