// external import
import bcrypt from 'bcrypt';

// local import
import User from '../models/userModel.js';
import ErrorResponse from '../utils/error.js';

async function loginController(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse('Please enter your email and password.', 400)
    );
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse('User does not exists!.', 404));
    }
    // check the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return next(new ErrorResponse('Invalid password!', 401));
    }

    // generateToken
    const token = await user.generateToken();

    // set cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      expiresIn: '24h',
    });
    res.status(200).json({
      token,
    });
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse(error.message, error.code));
  }
}

export default loginController;
