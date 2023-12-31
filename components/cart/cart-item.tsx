import { useState } from "react";
import Image from "next/image";

import useCart from "@/hooks/use-cart";

import type { CartWithProducts } from "@/types/db";
import { Button, ButtonGroup, Divider, IconButton } from "@chakra-ui/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type CartItemProps = {
  product: CartWithProducts;
};

export default function CartItem({ product }: CartItemProps) {
  const { addToCart, removeFromCart } = useCart();

  const { quantity, Product } = product;
  const { images, name, price } = Product;
  const image = images[0].url;
  const newPrice = price * quantity;

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleAddToQuantity = async () => {
    setButtonDisabled(true);
    try {
      await addToCart(Product);
    } catch (error) {
      console.error(error);
    } finally {
      setButtonDisabled(false);
    }
  };

  const handleRemoveFromQuantity = async () => {
    setButtonDisabled(true);
    try {
      await removeFromCart(product);
    } catch (error) {
      console.error(error);
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <li className="w-full p-4 space-y-4">
      <div className="flex">
        <Image src={image} width={100} height={100} alt="product" />
        <div className="text-center">
          <p>{name}</p>
          <p>${newPrice}</p>
        </div>
      </div>

      <ButtonGroup isAttached variant="outline" marginTop="4">
        <IconButton
          aria-label="decrement-quantity"
          onClick={handleRemoveFromQuantity}
          isDisabled={buttonDisabled}
        >
          <AiOutlineMinus />
        </IconButton>
        <Button className="px-8" isDisabled>
          Quantity:<span className="text-center ml-2"> {quantity}</span>
        </Button>
        <IconButton
          aria-label="increase-quantity"
          onClick={handleAddToQuantity}
          isDisabled={buttonDisabled}
        >
          <AiOutlinePlus />
        </IconButton>
      </ButtonGroup>
      <Divider />
    </li>
  );
}
