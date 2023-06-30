const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const reviewsSchema = new Schema({
  comment: {
    type: String,
    required: [true, 'Set your comment'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

reviewsSchema.post('save', handleMongooseError);

const reviewsAddSchema = Joi.object({
  comment: Joi.string().required().messages({
    'any.required': `missing required comment field`,
  }),
  rating: Joi.number().valid(0, 1, 2, 3, 4, 5),  
});

const schemas = {
  reviewsAddSchema,  
};

const Reviews = model('reviews', reviewsSchema);

module.exports = { Reviews, schemas };
