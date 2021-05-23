import {Router} from 'express';
const router = Router();

import * as userController from '../controllers/user.controller';

import * as checkAuth from '../middlewares/authJwt';

// Para controlar que la peticion se haga solamente con usuario tipo camarero autenticado, es:
//router.get('/', checkAuth.verifyWaiterToken, userController.getusers);

router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);

router.put('/:userId', userController.updateUserById);

router.delete('/:userId', userController.deleteUserById);



export default router;