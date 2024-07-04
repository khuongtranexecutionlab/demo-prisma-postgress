import { Router } from 'express';
import {createMenu, readMenu} from '../controllers/crawController';

const router = Router();

router.get('/', createMenu);
router.get('/menu', readMenu);

export default router;
