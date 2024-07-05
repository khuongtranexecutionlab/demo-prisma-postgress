import { IUser } from "../../controllers/userController";

declare module "express-serve-static-core" {
  interface Request {
    user: IUser | null;
  }
}
