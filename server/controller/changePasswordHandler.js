// external imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// internal imports
import User from '../models/userModel.js';
import ErrorResponse from '../utils/error.js';

async function changePasswordHandler(req, res, next) {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const validUser = await User.findOne({ _id: id, verifyToken: token });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (validUser && verifyToken._id) {
      const newHashedPassword = await bcrypt.hash(password, 10);

      // set the new password to the user
      const setNewPassword = await User.findByIdAndUpdate(
        { _id: id },
        { password: newHashedPassword }
      );
      await setNewPassword.save();
      res.status(200).json({
        success: true,
        message: 'Password changed successfully',
      });
    } else {
      return res.status(401).json({ error: 'error' });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error.message, error.code));
  }
}
export default changePasswordHandler;
