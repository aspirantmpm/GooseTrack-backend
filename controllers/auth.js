const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const cloudinary = require("cloudinary").v2;

// const path = require('path');
// const fs = require('fs/promises');
// const Jimp = require('jimp');
const { nanoid } = require("nanoid");

const { User } = require("../models/user");

const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");

// const { SECRET_KEY, BASE_URL } = process.env;

const { SECRET_KEY } = process.env;

// const avatarDir = path.join(__dirname, '../', 'public', 'avatars');

//google sign in
const googleAuth = async (req, res) => {
  const user = await User.findOne({ email });

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.redirect(`https://goosetrack-backend-2lsp.onrender.com?token=${token}`);
};

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const newAvatarUrl = gravatar.url(email, { default: "robohash" });
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
    subject: "Verify email",
    // html: `<a target="_blank" href="${BASE_URL}/api/auth/veryfy/${verificationToken}">Click veryfy email</a>`,
    html: `<a target="_blank" href="https://goosetrack-backend-2lsp.onrender.com/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarURL: newAvatarUrl,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    // html: `<a target="_blank" href="${BASE_URL}/api/auth/veryfy/${user.verificationToken}">Click veryfy email</a>`,
    html: `<a target="_blank" href="https://goosetrack-backend-2lsp.onrender.com/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    payload,
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;
  res.json({ email, name });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.json({
    messege: "Logout success",
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tmp, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  // Завантаження файлу на Cloudinary
  const uploadedImage = await cloudinary.uploader.upload(tmp, {
    public_id: `avatars/${filename}`,
    overwrite: true,
    transformation: [{ width: 250, height: 250, crop: "fill" }],
  });

  const avatarURL = uploadedImage.secure_url;

  // Оновлення URL аватару у базі даних або відповідній моделі користувача
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

// const updateAvatar = async (req, res) => {
//   const { _id } = req.user;
//   const { path: tmp, originalname } = req.file;
//   const filename = `${_id}_${originalname}`;

//   const resultUpload = path.join(avatarDir, filename);
//   await fs.rename(tmp, resultUpload);
//   const avatarURL = path.join('public', 'avatars', filename);
//   const newSizeFile = await Jimp.read(avatarURL);
//   await newSizeFile.resize(250, 250);
//   await newSizeFile.writeAsync(avatarURL);
//   await User.findByIdAndUpdate(_id, { avatarURL });

//   res.json({
//     avatarURL,
//   });
// };

module.exports = {
  register: ctrlWrapper(register),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  googleAuth: ctrlWrapper(googleAuth),
  // googleAuth: ctrlWrapper(googleAuth),
};
