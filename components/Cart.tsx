"use client"
import { useContext, useEffect } from "react"
import useSWR from "swr"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { fetchCartProducts } from "@/app/api/cart/categories"
import { AuthContext } from "@/contexts/AuthContext"
import useCart from "@/hooks/useCart"
import Drawer from "./Drawer"
import CartIcon from "./Icons/CartIcon"
import CartItem from "./CartItem"

const Cart = () => {
  const { addToCart, removeFromCart, cartItems, setCartItems } = useCart()
  const { userData } = useContext(AuthContext)

  const { data, error, isLoading } = useSWR(
    userData ? `${userData.id}` : null,
    fetchCartProducts
  )

  useEffect(() => {
    if (data) {
      setCartItems(data)
      console.log(cartItems)
    }
  }, [data, setCartItems, cartItems])

  if (error) return <div>failed to load</div>

  if (isLoading) return <p className='text-sm'>Loading...</p>

  return (
    <Drawer
      headerText='Cart'
      size='sm'
      placement='right'
      icon={<AiOutlineShoppingCart />}
      bodyStyles='flex flex-col gap-4 justify-center items-center'
    >
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => <CartItem key={item.id} product={item} />)
      ) : (
        <div className='flex flex-col items-center justify-center gap-4'>
          <CartIcon />
          <p>Your cart is empty.</p>
        </div>
      )}
    </Drawer>
  )
}

export default Cart
