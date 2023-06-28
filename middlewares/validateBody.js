const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { body, file } = req;
    const fileName = { avatarURL: file.originalname };
    const validateData = { ...body, ...fileName };
    const { error } = schema.validate(validateData);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
