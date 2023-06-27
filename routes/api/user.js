//router.post("/jwtrefresh", authenticate, ctrl.refreshToken);

const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares');
const ctrl = require('../../controllers/auth');

router.patch('/users/:userId', authenticate, ctrl.updateUser);

module.exports = router;
