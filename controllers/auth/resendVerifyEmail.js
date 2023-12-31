const { User } = require("../../models/user");
const { ctrlWrapper, HttpError, sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const protocol = req.protocol; 
  const host = req.get("host"); 
  const fullUrl = `${protocol}://${host}`;

  const verificationToken = nanoid();

  const localHost = ` https://goosetrack-backend-2lsp.onrender.com/api/auth/verify/${verificationToken}`;
  const verifyPage = `${BASE_URL}/verify/${verificationToken}`;

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${
      fullUrl === "http://localhost:3001" ? localHost : verifyPage
    }">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = { resendVerifyEmail: ctrlWrapper(resendVerifyEmail) };
