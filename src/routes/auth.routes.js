import {Router} from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller';

import {checkDuplicateUser} from '../middlewares/verifySignup';


router.post('/signup', checkDuplicateUser, authController.signUp);
router.post('/login', authController.login);

export default router;