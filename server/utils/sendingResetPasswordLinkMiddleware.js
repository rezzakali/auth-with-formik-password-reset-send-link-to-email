// external imports
import nodemailer from 'nodemailer';

// internal imports
import ErrorResponse from './error.js';

async function sendingResetPasswordLinkMiddleware({ id, token, email }) {
  try {
    // email configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_FRO,
      to: email,
      subject: 'reset password',
      text: `This link is valid for only 5 minutes. http://${process.env.HOST_NAME}:${process.env.FRONT_END_PORT}/change-password/${id}/${token}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw new ErrorResponse('Email not sent. Please try again', 500);
      } else {
        return res.status(200).json({
          status: 'success',
          message: 'Email has been sent',
        });
      }
    });
  } catch (error) {
    throw new ErrorResponse(error.message, error.code);
  }
}

export default sendingResetPasswordLinkMiddleware;
