const { Task } = require('../../models/task');
const { HttpError } = require('../../helpers');

const deleteById = async (req, res) => {
  const { _id } = req.params;
  const result = await Task.findByIdAndRemove(_id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'Task deleted' });
};

module.exports = deleteById;