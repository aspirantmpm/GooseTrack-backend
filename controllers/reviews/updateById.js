const { Reviews } = require('../../models/reviews');
const { HttpError, ctrlWrapper } = require('../../helpers');

const updateById = async (req, res) => {
  const { _id } = req.params;
  const result = await Reviews.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = ctrlWrapper(updateById);