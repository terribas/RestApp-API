import {Router} from 'express';
const router = Router();

import * as uploadImage from '../middlewares/uploadImage';
import * as imageController from '../controllers/image.controller';

router.post('/', imageController.upload);

export default router;