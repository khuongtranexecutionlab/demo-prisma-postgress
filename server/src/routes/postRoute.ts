import { Router } from 'express';
import { createPost, getPosts } from '../controllers/postController';

const router = Router();

router.post('/create', createPost);
router.get('/', getPosts);

export default router;
