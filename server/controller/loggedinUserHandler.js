// internal imports
import User from '../models/userModel.js';
import ErrorResponse from '../utils/error.js';

async function loggedinUserHandler(req, res, next) {
  const { token } = req.params;

  try {
    const user = await User.findOne({ token });
    const { email, phone, name, profile } = user;

    res.status(200).json({
      name,
      email,
      phone,
      profile,
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, error.code));
  }
}

export default loggedinUserHandler;
