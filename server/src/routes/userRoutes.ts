import express, { Router } from 'express';
import { getUsers, getUserById, login } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router: Router = express.Router();


// Public route for login
router.post('/login', login);

// Protected route (Only authorized users can see details)
router.get('/:id', protect, getUserById);

export default router;