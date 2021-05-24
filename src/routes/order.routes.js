import {Router} from 'express';
const router = Router();

import * as orderController from '../controllers/order.controller';

import * as checkAuth from '../middlewares/authJwt';

router.get('/', orderController.getOrders);
router.get('/:orderId', orderController.getOrderById);

router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateOrderById);

router.delete('/:orderId', orderController.deleteOrderById);



export default router;