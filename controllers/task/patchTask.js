const { Task } = require('../../models/task');
const { HttpError } = require('../../helpers');

const updateById = async (req, res) => {
  const { _id } = req.params;
  const result = await Task.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Task not found');
  }
  res.json(result);
};

module.exports = {
  updateById,
};