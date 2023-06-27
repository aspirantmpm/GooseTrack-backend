const getAll = require('./getAll');
const getById = require('./getById');
const postTask = require('./postTask');
const { updateById } = require('./patchTask');
const deleteById = require('./deleteById');

module.exports = {
  getAll,
  getById,
  postTask,
  updateById,
  deleteById,
};
