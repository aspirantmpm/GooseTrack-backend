require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async data => {
  const email = { ...data, from: 'aspirantmpm@gmail.com' };
  await sgMail.send(email);
  return true;
};

module.exports = sendEmail;
