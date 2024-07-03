import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    try {
    const { name, email, image} = req.body;
    console.log(req.body)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        image
      },
    });
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user", });
    }
  };

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany();
    res.json({data});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// export const createUserWithPosts = async (req: Request, res: Response) => {
//   try {
//     const { name, email, posts } = req.body;
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         posts: {
//           create: posts,
//         },
//       },
//       include: {
//         posts: true,
//       },
//     });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create user with posts" });
//   }
// };

// export const getUsersWithPosts = async (req: Request, res: Response) => {
//   try {
//     const usersWithPosts = await prisma.user.findMany({
//       include: {
//         posts: true,
//       },
//     });
//     res.json(usersWithPosts);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch users with posts" });
//   }
// };
