// external impors
import jwt from 'jsonwebtoken';

// internal imports
import User from '../models/userModel.js';
import ErrorResponse from '../utils/error.js';

async function resetPasswordVerifyUserHandler(req, res, next) {
  const { id, token } = req.params;

  try {
    const validUser = await User.findOne({ _id: id, verifyToken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (validUser && verifyToken._id) {
      res.status(201).json({
        success: true,
        validUser,
      });
    } else {
      return next(new ErrorResponse(401, 'User not found!'));
    }
    // next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error.message, error.code));
  }
}

export default resetPasswordVerifyUserHandler;
