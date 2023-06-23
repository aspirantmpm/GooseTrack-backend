// const fs = require('fs/promises');
// const path = require('path');
// const cloudinary = require('cloudinary').v2;

const { Reviews } = require('../models/reviews');

const { HttpError, ctrlWrapper } = require('../helpers');

// const avatarPath = path.resolve('public', 'avatars');

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Reviews.find({ skip, limit });
  res.json(result);
};

const getAllOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Reviews.find({ owner }, '-creeatedAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email name');
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Reviews.create({ ...req.body, owner });
  res.status(201).json(result);
};

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Reviews.findById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

// const add = async (req, res) => {
//   const { path: oldPath, filename } = req.file;
//   const newPath = path.join(avatarPath, filename);
//   await fs.rename(oldPath, newPath);
//   const avatar = path.join('public', 'avatars', filename);
//   const { _id: owner } = req.user;
//   const result = await Reviews.create({ ...req.body, avatar, owner });
//   res.status(201).json(result);
// };



const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Reviews.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

// const updateFavorite = async (req, res) => {
//   const { id } = req.params;
//   const result = await Reviews.findByIdAndUpdate(id, req.body, { new: true });
//   if (!result) {
//     throw HttpError(400, 'Missing field favorite');
//   }
//   res.json(result);
// };

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Reviews.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({ message: 'contact deleted' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getAllOwn: ctrlWrapper(getAllOwn),
  // getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  // updateFavorite: ctrlWrapper(updateFavorite),
  deleteById: ctrlWrapper(deleteById),
};
