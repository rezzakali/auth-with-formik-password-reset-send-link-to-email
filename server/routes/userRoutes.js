// external import
import { Router } from 'express';

// local import
import loginController from '../controller/loginController.js';
import logoutController from '../controller/logoutController.js';
import registerController from '../controller/registerController.js';
import profileUpload from '../middlewares/profileUploader.js';

// router object
const router = Router();

// register router
router.post('/register', profileUpload, registerController);

// login router
router.post('/login', loginController);

// logout router
router.delete('/logout', logoutController);

export default router;
