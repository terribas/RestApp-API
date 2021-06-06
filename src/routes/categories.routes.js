import {Router} from 'express';
const router = Router();

import * as categoryController from '../controllers/categories.controller';

import * as checkAuth from '../middlewares/authJwt';

router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategoryById);

router.post('/', checkAuth.verifyAdminToken, categoryController.createCategory);
router.put('/:categoryId', checkAuth.verifyAdminToken, categoryController.updateCategoryById);

router.delete('/:categoryId', checkAuth.verifyAdminToken, categoryController.deleteCategoryById);



export default router;