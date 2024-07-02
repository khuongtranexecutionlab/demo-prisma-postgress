import { Router } from 'express';
import { createUser, getUsers, createUserWithPosts, getUsersWithPosts } from '../controllers/userController';

const router = Router();

router.post('/create', createUser);
router.get('/', getUsers);
router.post('/create-with-posts', createUserWithPosts);
router.get('/with-posts', getUsersWithPosts);

export default router;
