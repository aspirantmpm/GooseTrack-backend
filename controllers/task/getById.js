const { Task } = require('../../models/task');
const { HttpError } = require('../../helpers');

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

module.exports = getById;