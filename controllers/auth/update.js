const { ctrlWrapper, HttpError } = require('../../helpers');
const { User } = require('../../models/user');
const { userDataValidator } = require('../../middlewares/userValidation');
const cloudinary = require('cloudinary');

const updateUser = async (req, res, next) => {
    const { _id } = req.params;
    const { name, email, password } = req.body;

    const { error } = userDataValidator(req.body);
    if (error) {
      throw HttpError(404, 'Not found');
    }

    if (req.file) {
      const upload = await cloudinary.v2.uploader.upload(req.file.path);
      req.body.avatarURL = upload.secure_url;
    }

    const updatedData = {};
    if (name) {
      updatedData.name = name;
    }
    if (email) {
      updatedData.email = email;
    }
    if (password) {
      updatedData.password = password;
    }

    const result = await User.findByIdAndUpdate(_id, req.body, updatedData, {
      new: true,
    });

    if (!result) {
      throw HttpError(404, 'User not found');
    }

    res.json({
      status: 'success',
      code: 200,
      message: 'User updated',
      data: { result },
    });
  };

module.exports = ctrlWrapper(updateUser);