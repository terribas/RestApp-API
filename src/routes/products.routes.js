import {Router} from 'express';
const router = Router();

import * as productController from '../controllers/products.controller';

import * as checkAuth from '../middlewares/authJwt';

router.post('/', productController.getProducts);
router.get('/:productId', productController.getProductById);

router.post('/create', productController.createProduct);
router.put('/:productId', productController.updateProductById);

router.delete('/:productId', productController.deleteProductById);



export default router;