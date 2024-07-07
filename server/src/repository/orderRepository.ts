import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

const createOrder = async (req: Request) => {
  const { total, items } = req.body;
  const order = await prisma.order.create({
    data: {
      user_id: req.user?.id!,
      total,
      items: {
        create: items,
      },
    },
  });
  return order;
};

export { createOrder as create };
