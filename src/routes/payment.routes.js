import {Router} from 'express';
const router = Router();
import * as paymentController from '../controllers/payment.controller';
import * as checkAuth from '../middlewares/authJwt';

router.post('/createPaymentMethod', paymentController.createPaymentMethod);
router.post('/pay', paymentController.pay);
router.post('/save_card_v2', checkAuth.verifyToken, paymentController.saveCard_v2);
router.post('/getCard', checkAuth.verifyToken, paymentController.getCard);
router.post('/payWithCard', paymentController.payWithCard);
router.post('/deleteCard', checkAuth.verifyToken, paymentController.deleteCard);



export default router;