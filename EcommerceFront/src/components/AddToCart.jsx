import { useState } from "react";
import api from "../api/axios";
import useAuthContext from "../context/AuthContext";
import Loader from "./Loader";

const AddToCartButton = ({ product }) => {
  const { user } = useAuthContext();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    const cartItem = {
      product_id: product.id,
      quantity: 1,
      image: product.image,
      name: product.name,
      price: product.price,
    };
    if (user) {
      api
        .post("/api/cart", { cartItem })
        .then((response) => {
          console.log("Product added to cart:", response.data);
          setIsAddingToCart(false);
          // Display a success message to the user
        })
        .catch((error) => {
          console.log("Error adding product to cart:", error);
          setIsAddingToCart(false);
          // Display an error message to the user
        });
    } else {
      setIsAddingToCart(true);
      const storedCartItems = localStorage.getItem("cartItems");

      let cartItems = [];
      if (storedCartItems) {
        cartItems = JSON.parse(storedCartItems);
      }
      const existingCartItem = cartItems.find(
        (item) => item.product_id === cartItem.product_id
      );
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        cartItems.push(cartItem);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      setIsAddingToCart(false);
      // Display a success message to the user
    }
  };

  return (
    <div
      className="bg-black text-white px-4 py-2"
      onClick={handleAddToCart}
      disabled={isAddingToCart}
    >
      {isAddingToCart ? <Loader /> : "Add to Bag"}
    </div>
  );
};

export default AddToCartButton;
