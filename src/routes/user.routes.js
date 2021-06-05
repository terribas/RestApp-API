import {Router} from 'express';
const router = Router();

import * as userController from '../controllers/user.controller';

import * as checkAuth from '../middlewares/authJwt';

// Para controlar que la peticion se haga solamente con usuario tipo camarero autenticado, es:
//router.get('/', checkAuth.verifyWaiterToken, userController.getusers);

//router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);

router.post('/', userController.getUsers)
router.post('/staff', userController.getStaff)
router.post('/myUser', checkAuth.verifyToken, userController.getMyUser);

router.put('/:userId', userController.updateUserById);
router.put('/', checkAuth.verifyToken, userController.updateMyUser);

router.delete('/deleteUser/:userId', userController.deleteUserById);
router.delete('/deleteStaff/:userId', userController.deleteStaffById);



export default router;