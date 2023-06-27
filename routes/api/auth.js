const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/auth');
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', ctrl.current);

router.post('/logout', ctrl.logout);

router.patch('/updateUser', validateBody(schemas.updateUserSchema), ctrl.updateUser);


// router.patch('/upload', upload.single('avatar'), ctrl.updateAvatar);

// router.post('/upload', uploader.single('avatar'), async (req, res) => {
//   const upload = await cloudinary.v2.uploader.upload(req.file.path);
//   return res.json({
//     success: true,
//     file: upload.secure_url,
//   });
// });

module.exports = router;

