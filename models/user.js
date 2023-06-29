const { Schema, model, Date } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const birthdayRegexp = /^((0[1-9]|[12]\d|3[01])\/(0[1-9]|1[012])\/\d{4})$/;
const phoneRegexp = /^\+?\d{1,3}\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    match: birthdayRegexp,
    default: null,
  },
  email: {
    type: String,
    match: emailRegexp,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Set password for user"],
    minlength: 6,
  },
  avatarURL: {
    type: String,
    default: "",
    // required: true,
  },
  phone: {
    type: String,
    match: phoneRegexp,
    // enum: ["starter", "pro", "business"],
    // default: "starter",
  },
  skype: {
    type: String,
    // enum: ["starter", "pro", "business"],
    // default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
    default: "",
  },
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

const updateUserSchema = Joi.object().keys({
  avatarURL: Joi.string().required(),
  name: Joi.string().required(),
  birthday: Joi.string().pattern(birthdayRegexp).required(),
  phone: Joi.string().pattern(phoneRegexp).required(),
  skype: Joi.string(),
});

const schemas = {
  registerSchema,
  emailSchema,
  loginSchema,
  updateUserSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
