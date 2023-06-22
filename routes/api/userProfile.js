const express = require('express');
// const cloudinary = require('../../cloudinary/cloudinary');
// const uploader = require('../../cloudinary/multer');

const router = express.Router();

const ctrl = require('../../controllers/userProfile');

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/userProfile');

router.get('/', authenticate, ctrl.getAll);

router.get('/:id', authenticate, isValidId, ctrl.getById);

// router.post('/upload', ctrl.getById);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.userProfileAddSchema),
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
