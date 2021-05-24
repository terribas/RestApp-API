import {Router} from 'express';
const router = Router();
import * as paymentController from '../controllers/payment.controller';


router.post('/createPaymentMethod', paymentController.createPaymentMethod);
router.post('/pay', paymentController.pay);


export default router;