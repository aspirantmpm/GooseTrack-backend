const Joi = require("joi");

const userDataValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(30),
    email: Joi.string().email().trim(),
    password: Joi.string().min(6).trim(),
  });

  return schema.validate(data);
};

module.exports = {
  userDataValidator,
};
