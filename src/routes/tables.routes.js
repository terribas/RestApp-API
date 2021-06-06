import {Router} from 'express';
const router = Router();

import * as tableController from '../controllers/tables.controller';

import * as checkAuth from '../middlewares/authJwt';


// Para controlar que la peticion se haga solamente con usuario tipo camarero autenticado, es:
//router.get('/', checkAuth.verifyWaiterToken, tableController.getTables);

router.get('/', checkAuth.verifyStaffToken, tableController.getTables);
router.get('/:tableId', checkAuth.verifyStaffToken, tableController.getTableById);
router.get('/lastorders/:tableId', checkAuth.verifyStaffToken, tableController.getTableRecentOrders);


//client need waiter
router.post('/turn/:tableId', checkAuth.verifyToken, tableController.turnTableStatus);

router.post('/', checkAuth.verifyAdminToken, tableController.createTable);
router.put('/:tableId', checkAuth.verifyAdminToken, tableController.updateTableById);

router.delete('/:tableId', checkAuth.verifyAdminToken, tableController.deleteTableById);



export default router;