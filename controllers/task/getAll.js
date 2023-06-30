const { Task } = require("../../models/task");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 50 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Task.find({ owner }).skip(skip).limit(limit);
  res.json(result);
};

module.exports = getAll;
