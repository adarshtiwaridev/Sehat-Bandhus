import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_AUTH,
    pass: process.env.MAIL_PASS,
  },
});

export const sendAmcEnquiryEmail = async (mailOptions) => {
  return transporter.sendMail(mailOptions);
}; 