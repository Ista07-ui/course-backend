// utils/mailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `http://localhost:3000/api/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: `"Course App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<p>Please click <a href="${verificationUrl}">this link</a> to verify your email.</p>`,
  });
};
