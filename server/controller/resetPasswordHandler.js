// external imports
import jwt from 'jsonwebtoken';

// internal imports
import User from '../models/userModel.js';
import ErrorResponse from '../utils/error.js';
import sendingResetPasswordLinkMiddleware from '../utils/sendingResetPasswordLinkMiddleware.js';

async function resetPasswordHandler(req, res, next) {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        error: 'User does not exist!',
      });
    }

    //    generate token for reset password request
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '300s',
    });

    // set the token to the user
    const setUserToken = await User.findByIdAndUpdate(
      { _id: user._id },
      { verifyToken: token },
      { new: true }
    );

    // send the reset password link to the user email address
    if (setUserToken) {
      sendingResetPasswordLinkMiddleware({
        id: user._id,
        token: setUserToken.verifyToken,
        email,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error.message, error.code));
  }
}

export default resetPasswordHandler;
