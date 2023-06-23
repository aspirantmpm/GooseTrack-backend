const express = require('express');
// const cloudinary = require('../../cloudinary/cloudinary');
// const uploader = require('../../cloudinary/multer');

const router = express.Router();

const ctrl = require('../../controllers/reviews');

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/reviews');

router.get('/', authenticate, ctrl.getAll);

router.get('/:id', authenticate, isValidId, ctrl.getAllOwn);

router.post('/', authenticate, validateBody(schemas.reviewsAddSchema), ctrl.add);

// router.get('/:id', authenticate, isValidId, ctrl.getById);

// router.post('/upload', ctrl.getById);

router.delete('/:id', authenticate, isValidId, ctrl.deleteById);

router.patch(
  '/:_id',
  authenticate,
  isValidId,
  validateBody(schemas.reviewsAddSchema),
  ctrl.updateById
);

// router.patch(
//   '/:id/favorite',
//   authenticate,
//   isValidId,
//   validateBody(schemas.updateFavoriteShema),
//   ctrl.updateFavorite
// );

// router.patch(
//   '/:id/favorite',
//   authenticate,
//   isValidId,
//   validateBody(schemas.reviewsAddSchema),
//   ctrl.updateById
// );

module.exports = router;
