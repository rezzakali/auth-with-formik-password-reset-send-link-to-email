// external imports
import { Router } from 'express';

// internal imports
import changePasswordHandler from '../controller/changePasswordHandler.js';
import resetPasswordHandler from '../controller/resetPasswordHandler.js';

// router object
const router = Router();

//  reset password router
router.post('/forgot-password', resetPasswordHandler);

// change password router
router.post('/change-password/:id/:token', changePasswordHandler);

export default router;
