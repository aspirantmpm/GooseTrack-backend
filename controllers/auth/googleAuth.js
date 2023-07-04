const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");
const { ctrlWrapper } = require("../../helpers");
const { SECRET_KEY } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.redirect(`https://markizdickabraz.github.io/GooseTeam/?token=${token}`);
};

module.exports = { googleAuth: ctrlWrapper(googleAuth) };
