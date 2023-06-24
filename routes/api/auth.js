const express = require('express');
// const {uploader, cloudinary} = require('../../middlewares/index');
const ctrl = require('../../controllers/auth');

const { schemas } = require('../../models/user');

const { validateBody, authenticate } = require('../../middlewares');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/updateUser', authenticate, validateBody(schemas.updateUserSchema), ctrl.updateById);

// router.patch('/upload', upload.single('avatar'), authenticate, ctrl.updateAvatar);

// router.post('/upload', uploader.single('avatar'), async (req, res) => {
//   const upload = await cloudinary.v2.uploader.upload(req.file.path);
//   return res.json({
//     success: true,
//     file: upload.secure_url,
//   });
// });

module.exports = router;
