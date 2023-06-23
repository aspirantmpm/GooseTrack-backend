const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const dateRegexp = [
  /^\d{4}-((0[1-9])|(1[012]))-((0[1-9]|[12]\d)|3[01])$/,
  'Invalid date format (e.g., 2023-06-23)',
];
const timeRegexp = [/^([0-2]\d):[0-5]\d$/, 'Invalid time format (e.g., 09:00)'];
const now = new Date();
const formatedDate = now.format('yyyy-mm-dd');

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: 'Title',
    maxlength: [250, 'Title cannot exceed 250 characters'],
  },
  start: {
    type: String,
    required: true,
    match: timeRegexp,
  },
  end: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const startValue = this.start;
        return value > startValue;
      },
      message: 'End time must be greater than start time',
    },
    match: timeRegexp,
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'low',
    trim: true,
  },
  date: {
    type: String,
    required: true,
    default: formatedDate,
    match: dateRegexp,
  },
  category: {
    type: String,
    required: true,
    enum: ['to-do', 'in-progress', 'done'],
    default: 'to-do',
    trim: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

taskSchema.post('save', handleMongooseError);

const taskAddSchema = Joi.object({
  title: Joi.string().required(),
  comment: Joi.string().required().messages({
    'any.required': `missing required comment field`,
  }),
  start: Joi.string().required().messages({
    'any.required': `missing required start field`,
  }),
  end: Joi.string().required().messages({
    'any.required': `missing required end field`,
  }),
  priority: Joi.string().required(),
  date: Joi.string().required(),
  category: Joi.string().required(),
});


const schemas = {
  taskAddSchema,  
};

const Task = model('task', taskSchema);

module.exports = { Task, schemas };
