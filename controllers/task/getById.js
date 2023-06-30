const { Task } = require('../../models/task');
// const { HttpError } = require('../../helpers');

// const getById = async (req, res) => {
//   const { id } = req.params;
//   const result = await Task.findById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
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
        month: { $month: '$convertedDate' },
        day: { $dayOfMonth: '$convertedDate' },
        year: { $year: '$convertedDate' },
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


module.exports = getTaskPerMonth;