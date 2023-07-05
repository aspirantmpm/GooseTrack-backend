const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/task');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/task');

router.get('/', authenticate, ctrl.getAll);

router.post('/', authenticate, validateBody(schemas.taskAddSchema), ctrl.postTask);

router.get('/:_id', authenticate, isValidId, ctrl.getTaskPerMonth);

router.delete('/:_id', authenticate, isValidId, ctrl.deleteById);

router.patch(
  '/:_id',
  authenticate,
  isValidId,
  validateBody(schemas.taskAddSchema),
  ctrl.updateById
);

module.exports = router;

