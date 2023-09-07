"use client";
import { useEffect, createContext } from "react";
import useSWR from "swr";
import useCart from "@/hooks/useCart";
import { fetchCartByUserId } from "@/lib/cartFetch";
import { useAuth } from "@/contexts/auth-context";
import { type CartHook } from "@/types/types";

export const CartContext = createContext<CartHook | undefined>(undefined);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { cartItems, removeFromCart, clearCart, setCartItems, addToCart } =
    useCart();
  const { userData } = useAuth();

  const { data } = useSWR(
    userData ? `${userData.id}` : null,
    fetchCartByUserId
  );

  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data, setCartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, removeFromCart, clearCart, addToCart, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
