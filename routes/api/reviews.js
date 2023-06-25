const express = require('express');
// const cloudinary = require('../../cloudinary/cloudinary');
// const uploader = require('../../cloudinary/multer');

const router = express.Router();

const ctrl = require('../../controllers/reviews');

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/reviews');

router.get('/:_id', isValidId, ctrl.getAllOwn);

router.post('/', validateBody(schemas.reviewsAddSchema), ctrl.addReview);

// router.get('/:id', authenticate, isValidId, ctrl.getById);

// router.post('/upload', ctrl.getById);

router.delete('/:_id',  isValidId, ctrl.deleteById);

router.patch(
  '/:_id',
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
