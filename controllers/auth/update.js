const { ctrlWrapper, HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;
const cloudinary = require("cloudinary").v2;

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  const { id } = jwt.verify(token, SECRET_KEY);
  if (!id) {
    throw HttpError(404, "Not found");
  }

  if (req.file) {
    const upload = await cloudinary.uploader.upload(req.file.path);
    req.body.avatarURL = upload.secure_url;
  }

  const updatedData = {};
  if (name) {
    updatedData.name = name;
  }
  if (email) {
    updatedData.email = email;
  }

  const { birthday } = req.body;
  const birthdayDate = moment(birthday, "DD/MM/YYYY").toDate();

  req.body.birthday = birthdayDate;
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "User not found");
  }
  res.json({
    status: "success",
    code: 200,
    message: "User updated",
    data: { result },
  });
};

module.exports = { updateUser: ctrlWrapper(updateUser) };
