import {Router} from 'express';
const router = Router();

import * as tableController from '../controllers/tables.controller';

import * as checkAuth from '../middlewares/authJwt';

router.get('/', checkAuth.verifyWaiterToken, tableController.getTables);
router.get('/:tableId', tableController.getTableById);

router.post('/', tableController.createTable);
router.put('/:tableId', tableController.updateTableById);

router.delete('/:tableId', tableController.deleteTableById);



export default router;