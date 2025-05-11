// utils/mailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `http://localhost:${process.env.PORT}/api/auth/verify?token=${token}`;

  await transporter.verify();
  console.log("Server is ready to take our messages");

  await transporter.sendMail({
    from: `"Course App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email",
    html: `<p>Please click <a href="${verificationUrl}">this link</a> to verify your email.</p>`,
  });

  console.log("Preview URL: https:ethereal.email");
  console.log("username :", process.env.EMAIL_USER);
  console.log("password :", process.env.EMAIL_PASS);
};
