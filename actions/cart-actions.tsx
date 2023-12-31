import prisma from "@/lib/prisma";

import { type Cart } from "@/types/db";

export const findCartItemByUserIdAndProductId = async (
  userId: string,
  productId: number
) => {
  return await prisma.carts.findFirst({
    where: {
      userId,
      productId,
    },
  });
};

export const getCartItems = async (userId: string) => {
  return await prisma.carts.findMany({
    where: {
      userId,
    },
    include: {
      Product: {
        select: {
          name: true,
          stock: true,
          price: true,
          id: true,
          images: true,
        },
      },
    },
  });
};

export const updateItemQuantity = async (
  cartItem: Cart,
  decreased: boolean
) => {
  const action = decreased ? cartItem.quantity - 1 : cartItem.quantity + 1;
  return await prisma.carts.update({
    where: {
      id: cartItem.id,
    },
    data: {
      quantity: action,
    },
  });
};

export const addItemToCart = async (userId: string, productId: number) => {
  return await prisma.carts.create({
    data: {
      userId,
      productId,
      quantity: 1,
    },
  });
};

export const deleteItemFromCart = async (cartId: number) => {
  return await prisma.carts.delete({
    where: {
      id: cartId,
    },
  });
};
