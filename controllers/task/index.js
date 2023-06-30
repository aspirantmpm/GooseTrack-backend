const getAll = require('./getAll');
const getTaskPerMonth = require('./getById');
const postTask = require('./postTask');
const { updateById } = require('./patchTask');
const deleteById = require('./deleteById');

module.exports = {
  getAll,
  getTaskPerMonth,
  postTask,
  updateById,
  deleteById,
};
