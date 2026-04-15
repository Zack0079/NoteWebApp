import express, { Router } from 'express';
import userCtrl from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router: Router = express.Router();


// Public route for login
router.post('/login', userCtrl.login);

//check token is valid or not & reutn user details if valid
router.get('/userAuth', userCtrl.userLoginAuthCheck);


export default router;