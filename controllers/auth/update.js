const { ctrlWrapper, HttpError } = require("../../helpers");
const moment = require("moment");
const { User } = require("../../models/user");
const cloudinary = require("cloudinary").v2;

const updateUser = async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) {
    throw HttpError(404, "Not found");
  }

  if (req.file) {
    const upload = await cloudinary.uploader.upload(req.file.path);
    req.body.avatarURL = upload.secure_url;
  }

  if (req.body.birthday) {
    const { birthday } = req.body;
    const birthdayDate = moment(birthday, "DD/MM/YYYY").toDate();
    req.body.birthday = birthdayDate;
  }
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

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
