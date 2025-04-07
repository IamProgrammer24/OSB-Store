const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Set up the transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.ethereal.email",
  port: process.env.MAIL_PORT || 587,

  auth: {
    user: process.env.MAIL_USER || "brenda.sipes4@ethereal.email",
    pass: process.env.MAIL_PASS || "rdD2AXCXPcWKwcYCpj",
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || "brenda.sipes4@ethereal.email",
      to,
      subject,
      text,
    });

    console.log("Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendEmail };
