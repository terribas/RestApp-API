import {Router} from 'express';
const router = Router();

import * as uploadImage from '../middlewares/uploadImage';
import * as imageController from '../controllers/image.controller';
import * as checkAuth from '../middlewares/authJwt';

router.post('/', checkAuth.verifyAdminToken, imageController.upload);

export default router;