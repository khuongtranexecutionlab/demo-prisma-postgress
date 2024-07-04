import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  admin: boolean;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user as UserPayload;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user.admin) {
    return res.sendStatus(403);
  }
  next();
};
