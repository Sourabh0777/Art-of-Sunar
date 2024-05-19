"use server";

import prisma from "@/lib/db";
import { GetOrderItems } from "@/types/get-order-items";

const getOrderItems = async (orderId: string) => {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId,
      },
      include: {
        product: true,
        store: true,
      },
    });
  
    return orderItems;
  
    
  } catch (error) {
    console.log("🚀 ~ getOrderItems ~ error:", error)
  }
};

export default getOrderItems;
