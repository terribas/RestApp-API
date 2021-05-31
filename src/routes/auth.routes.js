import {Router} from 'express';
const router = Router();

import * as authController from '../controllers/auth.controller';

import * as checkAuth from '../middlewares/authJwt';
import {checkDuplicateUser} from '../middlewares/verifySignup';


router.post('/signup', checkDuplicateUser, authController.signUp);
router.post('/login', authController.login);
router.post('/changeMyPassword', checkAuth.verifyToken, authController.changeMyPassword);

export default router;