import {Router} from 'express';
const router = Router();

import * as orderController from '../controllers/order.controller';

import * as checkAuth from '../middlewares/authJwt';

router.post('/', checkAuth.verifyStaffToken, orderController.getOrders);
router.get('/:orderId', checkAuth.verifyStaffToken, orderController.getOrderById);

router.post('/create', checkAuth.verifyToken, orderController.createOrder);
router.post('/myOrders', checkAuth.verifyToken, orderController.getMyOrders);
router.post('/myLastOrder', checkAuth.verifyToken, orderController.getMyLastOrder);

/* pending and delivered order for staff */
router.get('/kitchen/pending', checkAuth.verifyStaffToken, orderController.getKitchenPendingOrders);
router.get('/kitchen/delivered', checkAuth.verifyStaffToken, orderController.getKitchenDeliveredOrders);
router.get('/bar/pending', checkAuth.verifyStaffToken, orderController.getBarPendingOrders);
router.get('/bar/delivered', checkAuth.verifyStaffToken, orderController.getBarDeliveredOrders);

router.put('/bar/toggle/:orderId', checkAuth.verifyStaffToken, orderController.toggleBarOrder);
router.put('/kitchen/toggle/:orderId', checkAuth.verifyStaffToken, orderController.toggleKitchenOrder);

router.put('/:orderId', checkAuth.verifyAdminToken, orderController.updateOrderById);

router.delete('/:orderId', checkAuth.verifyAdminToken, orderController.deleteOrderById);



export default router;