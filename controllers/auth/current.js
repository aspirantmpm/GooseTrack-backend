const { ctrlWrapper } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { token, email, name, phone, birthday, skype, avatarURL } = req.user;

  res.json({
    token,
    user: {
      email,
      name,
      phone,
      birthday,
      skype,
      avatarURL,
    },
  });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
