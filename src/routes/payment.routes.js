import {Router} from 'express';
const router = Router();
import * as paymentController from '../controllers/payment.controller';
import * as checkAuth from '../middlewares/authJwt';

router.post('/createPaymentMethod', checkAuth.verifyToken, paymentController.createPaymentMethod);
router.post('/pay', checkAuth.verifyToken, paymentController.pay);
router.post('/save_card_v2', checkAuth.verifyToken, checkAuth.verifyToken, paymentController.saveCard_v2);
router.post('/getCard', checkAuth.verifyToken, paymentController.getCard);
router.post('/payWithCard', checkAuth.verifyToken, paymentController.payWithCard);
router.post('/deleteCard', checkAuth.verifyToken, paymentController.deleteCard);



export default router;