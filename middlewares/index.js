const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

const passport = require("./passport");
const upload = require("./upload");
module.exports = { validateBody, isValidId, authenticate, upload, passport };
