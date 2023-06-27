const { Reviews } = require('../../models/reviews');
const { HttpError, ctrlWrapper } = require('../../helpers');

const deleteById = async (req, res) => {
  const { _id } = req.params;
  const result = await Reviews.findByIdAndRemove(_id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Review deleted' });
};

module.exports = ctrlWrapper(deleteById);