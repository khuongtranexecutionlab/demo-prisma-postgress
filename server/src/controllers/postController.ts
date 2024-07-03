import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export const createPost = async (req: Request, res: Response) => {
//   try {
//     const { title, content, userId } = req.body;
//     const post = await prisma.post.create({
//       data: {
//         title,
//         content,
//         userId,
//       },
//     });
//     res.json(post);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create post" });
//   }
// };

// export const getPosts = async (req: Request, res: Response) => {
//   try {
//     const posts = await prisma.post.findMany();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch posts" });
//   }
// };
