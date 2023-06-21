const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { handleMongooseError } = require('../helpers');

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

contactsSchema.post('save', handleMongooseError);

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required name field`,
  }),
  email: Joi.string().required().messages({
    'any.required': `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `missing required phone field`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { contactsAddSchema, updateFavoriteSchema };

const Contacts = model('contacts', contactsSchema);

module.exports = { Contacts, schemas };
