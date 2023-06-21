const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId, authenticate, upload } = require('../../middlewares');

const { schemas } = require('../../models/contacts');

router.get('/', authenticate, ctrl.getAll);

router.get('/:id', authenticate, isValidId, ctrl.getById);

router.post(
  '/',
  upload.single('avatar'),
  authenticate,
  validateBody(schemas.contactsAddSchema),
  ctrl.add
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.contactsAddSchema),
  ctrl.updateById
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteShema),
  ctrl.updateFavorite
);

module.exports = router;
