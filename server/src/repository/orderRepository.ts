import { PrismaClient } from "@prisma/client";
import { Request } from "express";

const prisma = new PrismaClient();

const createOrder = async (req: Request) => {
  const { title, content, price } = req.body;
  const order = await prisma.order.create({
    data: {
      title,
      content,
      user_id: req.user!.id,
      price,
    },
  });
  return order;
};

export { createOrder as create };
