import {Router} from 'express';
const router = Router();

import * as userController from '../controllers/user.controller';

import * as checkAuth from '../middlewares/authJwt';

// Para controlar que la peticion se haga solamente con usuario tipo camarero autenticado, es:
//router.get('/', checkAuth.verifyWaiterToken, userController.getusers);

//router.get('/', userController.getUsers);
router.get('/:userId', checkAuth.verifyStaffToken, userController.getUserById);

router.post('/', checkAuth.verifyStaffToken, userController.getUsers)
router.post('/staff', checkAuth.verifyStaffToken, userController.getStaff)
router.post('/myUser', checkAuth.verifyToken, userController.getMyUser);

router.put('/', checkAuth.verifyToken, userController.updateMyUser);
router.put('/:userId', checkAuth.verifyAdminToken, userController.updateUserById);

router.delete('/deleteUser/:userId', checkAuth.verifyAdminToken, userController.deleteUserById);
router.delete('/deleteStaff/:userId', checkAuth.verifyAdminToken, userController.deleteStaffById);



export default router;