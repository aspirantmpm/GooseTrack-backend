const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { User } = require('../../models/user');
const { ctrlWrapper, HttpError, sendEmail } = require('../../helpers');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, 'Email already in use');
  }
  const newAvatarUrl = gravatar.url(email, { default: 'robohash' });
  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: newAvatarUrl,
    verificationToken,
  });
  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="https://goosetrack-backend-2lsp.onrender.com/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarURL: newAvatarUrl,
  });
};

module.exports = ctrlWrapper(register);