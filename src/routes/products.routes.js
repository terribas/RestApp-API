import {Router} from 'express';
const router = Router();

import * as productController from '../controllers/products.controller';

import * as checkAuth from '../middlewares/authJwt';

router.post('/', productController.getProducts);
router.get('/:productId', productController.getProductById);

router.post('/create', checkAuth.verifyAdminToken, productController.createProduct);
router.put('/:productId', checkAuth.verifyAdminToken, productController.updateProductById);

router.delete('/:productId', checkAuth.verifyAdminToken, productController.deleteProductById);



export default router;