import {Router} from 'express';
const router = Router();

import * as statisticController from '../controllers/statistics.controller';

import * as checkAuth from '../middlewares/authJwt';

router.get('/', checkAuth.verifyAdminToken, statisticController.getStatistics);

/*
router.get('/orders', statisticController.ordersByMonth);
router.get('/incomes', statisticController.incomesByMonth);
router.get('/topProducts', statisticController.topProducts);
router.get('/referrals', statisticController.referrals);

router.get('/totalOrders', statisticController.totalOrders);
router.get('/totalIncomes', statisticController.totalIncomes);
router.get('/totalUsers', statisticController.totalUsers);
router.get('/totalStaff', statisticController.totalStaff);
*/


export default router;