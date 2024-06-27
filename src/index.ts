import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(bodyParser.json());

const port = 3000;
const prisma = new PrismaClient();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.post("/users/create", async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.post("/posts/create", async (req: Request, res: Response) => {
    try {
      const { title, content, userId } = req.body;
      const post = await prisma.post.create({
        data: {
          title,
          content,
          userId,
        },
      });
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  });

app.post("/users/create-with-posts", async (req: Request, res: Response) => {
  try {
    const { name, email, posts } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        posts: {
          create: posts,
        },
      },
      include: {
        posts: true,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user with posts" });
  }
});

app.get("/users", async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  
app.get("/posts", async (req: Request, res: Response) => {
    try {
      const posts = await prisma.post.findMany();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });
  
app.get("/users-with-posts", async (req: Request, res: Response) => {
    try {
      const usersWithPosts = await prisma.user.findMany({
        include: {
          posts: true,
        },
      });
      res.json(usersWithPosts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users with posts" });
    }
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});