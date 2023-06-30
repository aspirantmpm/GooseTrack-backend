const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");

const googleAuth = async (req, res) => {
  const user = await User.findOne({ email });

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.redirect(`https://goosetrack-backend-2lsp.onrender.com?token=${token}`);
};

module.exports = { googleAuth: ctrlWrapper(googleAuth) };
