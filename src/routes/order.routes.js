import {Router} from 'express';
const router = Router();

import * as orderController from '../controllers/order.controller';

import * as checkAuth from '../middlewares/authJwt';

router.post('/', orderController.getOrders);
router.get('/:orderId', orderController.getOrderById);

router.post('/create', checkAuth.verifyToken, orderController.createOrder);
router.post('/myOrders', checkAuth.verifyToken, orderController.getMyOrders);
router.post('/myLastOrder', checkAuth.verifyToken, orderController.getMyLastOrder);

/* pending and delivered order for staff */
router.get('/kitchen/pending', orderController.getKitchenPendingOrders);
router.get('/kitchen/delivered', orderController.getKitchenDeliveredOrders);
router.get('/bar/pending', orderController.getBarPendingOrders);
router.get('/bar/delivered', orderController.getBarDeliveredOrders);

router.put('/bar/toggle/:orderId', orderController.toggleBarOrder);
router.put('/kitchen/toggle/:orderId', orderController.toggleKitchenOrder);

router.put('/:orderId', orderController.updateOrderById);

router.delete('/:orderId', orderController.deleteOrderById);



export default router;