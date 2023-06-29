const { Reviews } = require('../../models/reviews');
const {
  // HttpError,
  ctrlWrapper } = require('../../helpers');

const addReview = async (req, res) => {
  const { _id: owner } = req.user;
  const existingReview = await Reviews.findOne({ owner });

  if (existingReview) {
    return res.status(409).json({ message: 'Review already exists for this user' });
  }

  try {
    const result = await Reviews.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = ctrlWrapper(addReview);