const { Reviews } = require('../../models/reviews');
const {
  // HttpError,
  ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Reviews.find().skip(skip).limit(limit);
  res.json(result);
};

module.exports = ctrlWrapper(getAll);