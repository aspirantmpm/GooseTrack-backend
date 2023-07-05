const { Task } = require('../../models/task');

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