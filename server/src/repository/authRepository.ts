import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

const create = async (req: Request) => {
  const { name, email, image } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      image,
    },
  });
  return user;
};

const get = async () => {
  const data = await prisma.user.findMany({
    include: {
      orders: true,
    },
  });
  return data;
};

const me = async (req: Request) => {
  const { email } = req.params;

  const data = await prisma.user.findUnique({
    where: { email },
  });

  return data;
};

export { create, get, me };
