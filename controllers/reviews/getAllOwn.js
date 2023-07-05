const { Reviews } = require('../../models/reviews');
const { ctrlWrapper } = require('../../helpers');

const getAllOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Reviews.find({ owner }, '-createdAt -updatedAt')
    .skip(skip)
    .limit(limit)
    .populate('owner', 'email name');
  res.json(result);
};

module.exports = ctrlWrapper(getAllOwn);