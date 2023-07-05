const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/reviews');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/reviews');

router.get('/', ctrl.getAll);

router.get('/:_id', authenticate, isValidId, ctrl.getAllOwn);

router.post('/', authenticate, validateBody(schemas.reviewsAddSchema), ctrl.addReview);

router.patch(
  '/:_id',
  authenticate,
  isValidId,
  validateBody(schemas.reviewsAddSchema),
  ctrl.updateById
);

router.delete('/:_id', isValidId, ctrl.deleteById);

module.exports = router;
