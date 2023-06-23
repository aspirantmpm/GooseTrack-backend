const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const reviewsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set your name'],
  },
  comment: {
    type: String,
    required: [true, 'Set your comment'],
  },
  // phone: {
  //   type: String,
  // },
  // favorite: {
  //   type: Boolean,
  //   default: false,
  // },
  // avatar: {
  //   type: String,
  //   required: true,
  // },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    // required: true,
  },
});

reviewsSchema.post('save', handleMongooseError);

const reviewsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required name field`,
  }),
  comment: Joi.string().required().messages({
    'any.required': `missing required comment field`,
  }),
  // phone: Joi.string().required().messages({
  //   'any.required': `missing required phone field`,
  // }),
  // favorite: Joi.boolean(),
});

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

const schemas = {
  reviewsAddSchema,
  // updateFavoriteSchema
};

const Reviews = model('reviews', reviewsSchema);

module.exports = { Reviews, schemas };
