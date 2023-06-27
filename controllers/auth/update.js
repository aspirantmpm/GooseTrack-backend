const { cloudinary } = require('../../middlewares/index');
const { User } = require('../../models/user');
const { ctrlWrapper, HttpError } = require('../../helpers');

const updateById = async (req, res) => {
  const { _id } = req.params;

  if (req.file) {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    req.body.avatarURL = upload.secure_url;
  }

  const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

module.exports = ctrlWrapper(updateById);