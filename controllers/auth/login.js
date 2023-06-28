const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { SECRET_KEY } = process.env;
const { ctrlWrapper, HttpError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const findByIdAndUpdateOptions = {
    select: "id email name phone birthday skype avatarURL",
  };
  const userData = await User.findByIdAndUpdate(
    user._id,
    { token },
    findByIdAndUpdateOptions
  );

  res.json({
    token,
    user: userData,
  });
};

module.exports = { login: ctrlWrapper(login) };
