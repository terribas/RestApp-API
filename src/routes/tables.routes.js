import {Router} from 'express';
const router = Router();

import * as tableController from '../controllers/tables.controller';

import * as checkAuth from '../middlewares/authJwt';


// Para controlar que la peticion se haga solamente con usuario tipo camarero autenticado, es:
//router.get('/', checkAuth.verifyWaiterToken, tableController.getTables);

router.get('/', tableController.getTables);
router.get('/:tableId', tableController.getTableById);
router.get('/lastorders/:tableId', tableController.getTableRecentOrders);


//client need waiter
router.post('/turn/:tableId', tableController.turnTableStatus);

router.post('/', tableController.createTable);
router.put('/:tableId', tableController.updateTableById);

router.delete('/:tableId', tableController.deleteTableById);



export default router;