const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const jwt = require("jsonwebtoken");

const googleAuth = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.redirect(`https://goosetrack-backend-2lsp.onrender.com?token=${token}`);
  // res.redirect(`http://localhost:3001?token=${token}`);
};

module.exports = { googleAuth: ctrlWrapper(googleAuth) };
