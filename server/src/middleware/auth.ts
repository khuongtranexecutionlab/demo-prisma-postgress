// middleware/auth.ts
import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies["authjs.session-token"];

  if (token) {
    jwt.verify(
      token,
      process.env.AUTH_SECRET as string,
      (err: any, decodedToken: any) => {
        if (err) {
          console.error("JWT Verification Error:", err);
          return res.sendStatus(403);
        }
        prisma.user
          .findUnique({
            where: { email: decodedToken.user.email },
          })
          .then((i) => {
            req.user = i;
            next();
          })
          .catch(() => res.sendStatus(400));
      },
    );
  } else {
    console.error("No token found");
    res.sendStatus(401);
  }
};
