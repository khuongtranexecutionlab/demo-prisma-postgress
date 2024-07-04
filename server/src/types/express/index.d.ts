import { IUser } from "../../src/utils/interface";

declare module "express-serve-static-core" {
  interface Request {
    user?: IUser;
  }
}
