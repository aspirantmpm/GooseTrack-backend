const express = require("express");
// const upload = require('../../middlewares/index');
const ctrl = require("../../controllers/auth");

const { schemas } = require("../../models/user");

const { validateBody, authenticate, passport } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

// google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      session: false,
    },
    ctrl.googleAuth
  )
);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

// router.patch('/upload', upload.single('avatar'), authenticate, ctrl.updateAvatar);

module.exports = router;
