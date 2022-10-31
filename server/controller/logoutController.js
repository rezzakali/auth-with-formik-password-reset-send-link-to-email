// internal imposts

import ErrorResponse from '../middlewares/errorMiddleware.js';

async function logoutController(req, res, next) {
  try {
    res.clearCookie('jwt', {
      httpOnly: true,
    });
    res.status(200).json({
      status: 'success',
      message: 'Successfully logged out',
    });
    next();
  } catch (error) {
    return next(new ErrorResponse(error.message, 500));
  }
}
export default logoutController;
