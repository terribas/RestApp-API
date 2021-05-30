import {Router} from 'express';
const router = Router();
import * as paymentController from '../controllers/payment.controller';


router.post('/createPaymentMethod', paymentController.createPaymentMethod);
router.post('/pay', paymentController.pay);
router.post('/save_card_v2', paymentController.saveCard_v2);
router.post('/getCard', paymentController.getCard);
router.post('/payWithCard', paymentController.payWithCard);
router.post('/deleteCard', paymentController.deleteCard);



export default router;