// local import
import User from '../models/userModel.js';
import ErrorResponse from '../utils/error.js';

async function registerController(req, res, next) {
  const { email, name, phone, password } = req.body;
  const profile = req.files ? req.files[0].filename : '';

  if (!email || !name || !phone || !password || !profile) {
    return res.status(400).json({
      status: 'error',
      message: 'email, name, phone ,profile and password are required!',
    });
  }

  try {
    // if email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        status: 'error',
        message: 'Email already exists!',
      });
    }

    const newUser = new User({
      name,
      email,
      phone,
      password,
      profile,
    });
    // save the user to the database
    await newUser.save();
    return res.status(201).json({
      status: 'success',
      message: 'User created successfully!',
      data: newUser,
    });
  } catch (err) {
    return next(new ErrorResponse(err.message, err.code));
  }
}
export default registerController;
