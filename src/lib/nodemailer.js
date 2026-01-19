import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // use true for port 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Sehathbandhu" <Info@Sehathbandhu.com>`,  // ✅ Proper format
    to: email,
    subject: "Email Verification - Sehathbandhu",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background-color: #f9fafb;">
        <div style="text-align: center; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
          <h2 style="color: #2563eb; margin: 0;">Sehathbandhu</h2>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Your trusted partner for innovation</p>
        </div>

        <div style="padding: 20px 0;">
          <h3 style="color: #111827;">Dear User,</h3>
          <p style="color: #374151; font-size: 15px; line-height: 1.6;">
            Thank you for signing up with <strong>Sehathbandhu</strong>!
            Please verify your email by entering the following One-Time Password (OTP):
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <span style="display: inline-block; background-color: #2563eb; color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 6px; letter-spacing: 2px;">
              ${otp}
            </span>
          </div>
          <p style="color: #374151; font-size: 15px;">
            This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.
          </p>
        </div>

        <div style="padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 13px; color: #6b7280;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Sehathbandhu. All rights reserved.</p>
        </div>
      </div>
    `,
  });
};

export const sendResetEmail = async (email, resetUrl) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Sehathbandhu" <Info@Sehathbandhu.com>`,
    to: email,
    subject: "Reset your Sehathbandhu password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background-color: #f9fafb;">
        <div style="text-align: center; padding-bottom: 15px; border-bottom: 1px solid #e5e7eb;">
          <h2 style="color: #2563eb; margin: 0;">Sehathbandhu</h2>
          <p style="color: #6b7280; font-size: 14px; margin: 0;">Password Reset</p>
        </div>
        <div style="padding: 20px 0;">
          <p style="color: #374151; font-size: 15px; line-height: 1.6;">
            Click the button below to reset your password. This link will expire in 1 hour.
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" style="display: inline-block; background-color: #2563eb; color: white; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 6px; text-decoration: none;">
              Reset Password
            </a>
          </div>
          <p style="color: #6b7280; font-size: 13px;">If the button doesn't work, copy and paste this link:<br/>${resetUrl}</p>
        </div>
        <div style="padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 13px; color: #6b7280;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Sehathbandhu. All rights reserved.</p>
        </div>
      </div>
    `,
  });
};
