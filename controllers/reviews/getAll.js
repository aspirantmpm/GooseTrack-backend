const { Reviews } = require('../../models/reviews');
const { ctrlWrapper } = require('../../helpers');

const getAll = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const reviews = await Reviews.find().skip(skip).limit(limit).populate('owner', 'name avatarURL');

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = ctrlWrapper(getAll);