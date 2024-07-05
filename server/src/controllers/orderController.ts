import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { readItemsFromExcel } from "../utils/Excel";
import { create } from "../repository/orderRepository";

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const emailDomain = req.user?.email.split("@")[1];
    // if (emailDomain !== "executionlab.asia")
    //   return res.status(403).json({ error: "Your email is not authorized !" });

    const items = await readItemsFromExcel();
    const itemExists = items.find(
      (item) => item.title.toLowerCase() === title.toLowerCase(),
    );
    if (!itemExists) {
      return res.status(400).json({ error: "Item does not exist" });
    }
    const order = await create(req);
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// export const getOrders = async (req: Request, res: Response) => {
//   try {
//     const orders = await prisma.order.findMany();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch order" });
//   }
// };

export const updateOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { paid, image } = req.body;
  try {
    const orders = await prisma.order.update({
      where: { id },
      data: {
        paid,
        image,
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};
