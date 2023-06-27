const express = require("express");
const router = express.Router();

const { authenticate } = require("../../middlewares");
const { refreshToken } = require("../../controllers/refreshToken");

router.post("/jwtrefresh", authenticate, refreshToken);

module.exports = router;
