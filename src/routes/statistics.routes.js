import {Router} from 'express';
const router = Router();

import * as statisticController from '../controllers/statistics.controller';

import * as checkAuth from '../middlewares/authJwt';


router.get('/orders', statisticController.getOrdersByMonth);
router.get('/incomes', statisticController.getIncomesByMonth);
router.get('/topProducts', statisticController.getTopProducts);
router.get('/referrals', statisticController.getTopReferrals);

router.get('/totalOrders', statisticController.getTotalOrders);
router.get('/totalIncomes', statisticController.getTotalIncomes);
router.get('/totalUsers', statisticController.getTotalUsers);
router.get('/totalStaff', statisticController.getTotalStaff);


export default router;