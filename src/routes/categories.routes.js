import {Router} from 'express';
const router = Router();

import * as categoryController from '../controllers/categories.controller';

import * as checkAuth from '../middlewares/authJwt';

router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategoryById);

router.post('/', categoryController.createCategory);
router.put('/:categoryId', categoryController.updateCategoryById);

router.delete('/:categoryId', categoryController.deleteCategoryById);



export default router;