const { createTransport }  = require("nodemailer")

const sendEmail = async (to, subject, text) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: 'majay1638@gmail.com',
      pass: 'Create123@',
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
  });
};

module.exports = sendEmail