const { Reviews } = require('../../models/reviews');
const { HttpError, ctrlWrapper } = require('../../helpers');

const addReview = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Reviews.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = ctrlWrapper(addReview);