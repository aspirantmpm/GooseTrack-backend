const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { body, file } = req;
    let fileName = null;

    if (file) fileName = { avatarURL: file.originalname };

    const validateData = { ...body, ...fileName };

    const { error } = schema.validate(file ? validateData : req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
