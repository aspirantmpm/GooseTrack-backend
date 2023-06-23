const { Task } = require('../models/task');
const { HttpError, ctrlWrapper } = require('../helpers');

// const getAll = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Task.find({ skip, limit });
//   res.json(result);
// };

const getTaskPerMonth = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const matchQuery = {
    owner: owner,
  };

  const tasks = await Task.aggregate([
    {
      $addFields: {
        convertedDate: { $toDate: '$date' },
        month: { $month: '$date' },
        day: { $dayOfMonth: '$date' },
        year: { $year: '$date' },
      },
    },
    {
      $match: matchQuery,
    },
    {
      $sort: { day: 1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ]);

  res.json(tasks);
};

const addTask = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Task.create({ ...req.body, owner });
  res.status(201).json(result);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Task.findById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

// const addTask = async (req, res) => {
//   const { path: oldPath, filename } = req.file;
//   const newPath = path.join(avatarPath, filename);
//   await fs.rename(oldPath, newPath);
//   const avatar = path.join('public', 'avatars', filename);
//   const { _id: owner } = req.user;
//   const result = await Task.create({ ...req.body, avatar, owner });
//   res.status(201).json(result);
// };

const updateById = async (req, res) => {
  const { _id } = req.params;
  const result = await Task.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

// const updateFavorite = async (req, res) => {
//   const { id } = req.params;
//   const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(400, 'Missing field favorite');
//   }
//   res.json(result);
// };

const deleteById = async (req, res) => {
  const { _id } = req.params;
  const result = await Task.findByIdAndRemove(_id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = {
  //   getAll: ctrlWrapper(getAll),
  getTaskPerMonth: ctrlWrapper(getTaskPerMonth),
  // getById: ctrlWrapper(getById),
  addTask: ctrlWrapper(addTask),
  updateById: ctrlWrapper(updateById),
  // updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
