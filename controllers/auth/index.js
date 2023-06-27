const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const update = require("./update");
const refreshToken = require('./refreshToken');

module.exports = {
  register,
  login,
  logout,
  current,
  update,
  refreshToken,
};