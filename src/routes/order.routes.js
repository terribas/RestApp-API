import {Router} from 'express';
const router = Router();

import * as orderController from '../controllers/order.controller';

import * as checkAuth from '../middlewares/authJwt';

router.get('/', orderController.getOrders);
router.get('/:orderId', orderController.getOrderById);

/* pending and delivered order for staff */
router.get('/kitchen/pending', orderController.getKitchenPendingOrders);
router.get('/kitchen/delivered', orderController.getKitchenDeliveredOrders);
router.get('/bar/pending', orderController.getBarPendingOrders);
router.get('/bar/delivered', orderController.getKitchenDeliveredOrders);

router.put('/bar/toggle/:orderId', orderController.toggleBarOrder);
router.put('/kitchen/toggle/:orderId', orderController.toggleKitchenOrder);

router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateOrderById);

router.delete('/:orderId', orderController.deleteOrderById);



export default router;