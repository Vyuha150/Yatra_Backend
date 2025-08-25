const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: process.env.SMTP_FROM || "noreply@yatra.com",
    to,
    subject,
    text,
    html,
  };
  return transporter.sendMail(mailOptions);
};
