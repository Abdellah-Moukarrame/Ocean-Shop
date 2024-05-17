import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Crad from "../components/Crad";
import AddToCartButton from "../components/AddToCart";
import useAuthContext from "../context/AuthContext";

export default function ProductDetail() {
  const { user } = useAuthContext();
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const shuffledProducts = products.sort(() => 0.5 - Math.random());
  const randomProducts = shuffledProducts.slice(0, 6);
  const formatPrice = (price) => {
    if (price == null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}/info`);
        const responses = await api.get("/api/products");

        const responseDatas = responses.data;
        const responseData = response.data;

        setProducts(responseDatas.data);
        setProduct(responseData.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    setAdded(true);

    const cartItem = {
      product_id: product.id,
      quantity: quantity,
      image: product.image,
      name: product.name,
      price: product.price,
    };
    if (user) {
      api
        .post("/api/cart", { cartItem })
        .then((response) => {
          console.log("Product added to cart:", response.data);
          setAdded(true);
          // Display a success message to the user
        })
        .catch((error) => {
          console.log("Error adding product to cart:", error);
          setAdded(false);
          // Display an error message to the user
        });
    } else {
      setAdded(true);
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

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };

  const handdleIncrement = () => {
    if (quantity < product.qty) {
      setQuantity((prevCount) => prevCount + 1);
    }
  };

  return (
    <>
      <div className=" h-20"></div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-auto lg:w-3/5 w-full relative">
          <div className="mb-5 lg:absolute top-5 left-5 text-center ">
            <BackButton />
          </div>

          <div className=" lg:hidden px-3">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-lg font-semibold mb-0">
              ${formatPrice(product.price)}
            </p>
          </div>

          <div className="mb-3 flex flex-col ">
            <img
              className=""
              src={`http://localhost:8000${product.image}`}
              alt={product.name}
            />
          </div>
          <div className="whitespace-pre-line p-3 mb-20 container">
            <h2>Description</h2>
            <p className=" text-xl">{product.description}</p>
          </div>
        </div>
        <div className="block lg:w-2/5">
          <div className=" sticky top-0 p-3   items-center">
            <div className="relative  p-5  w-full  lg:h-full border-2 border-solid border-black">
              <h1 className=" text-center text-3xl font-semibold m-0">
                {product.name}
              </h1>
              <p className="text-center ">
                Category · {product.category} {product.listing}
              </p>

              <p className="text-lg font-semibold mb-4">
                Available stocks: {product.qty}
              </p>
              <p className="text-lg font-semibold mb-4">
                price: MAD{formatPrice(product.price)}
              </p>

              <div className=" flex items-center">
                <p className="text-lg font-semibold m-0">Quantity:</p>
                <button
                  onClick={handleDecrement}
                  className=" font-bold px-2 border-2 border-black "
                >
                  -
                </button>
                <input
                  className=" w-7 border-y-2 text-center border-black"
                  type="number"
                  value={quantity}
                />
                <button
                  onClick={handdleIncrement}
                  className=" font-bold px-2 border-2 border-black "
                >
                  +
                </button>
              </div>
              <div className="h-10"></div>
              <div className="absolute text-center bottom-5 inset-x-0">
                <button
                  className={`bg-black text-white px-4 py-2 ${
                    product.qty === 0 ? "opacity-60" : "opacity-100"
                  }`}
                  onClick={handleAddToCart}
                  disabled={product.qty === 0}
                >
                  {product.qty == 0 ? "sold out" : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {added && (
          <div className="fixed top-0 bottom-0 w-full flex items-center justify-center z-20 bg-black/75 overscroll-none">
            <div className=" bg-white p-5 flex flex-col items-center border-solid border-black border-2 mx-3">
              <h2 className=" mb-5 lg:text-2xl text-xl font-bold">
                Added To Bag Succesfully...
              </h2>
              <div className=" flex">
                <button
                  className="mx-2 px-4 py-2 border-solid border-black border-2 font-semibold hover:bg-black hover:text-white"
                  type="button"
                  onClick={() => navigate("/cart")}
                >
                  To Cart
                </button>
                <button
                  className="mx-2 px-4 py-2 border-solid border-black border-2 font-semibold hover:bg-black hover:text-white"
                  type="button"
                  onClick={() => setAdded(false)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <hr />
      <br />
      <div className="container">
        <section className="mb-5">
          <h2 className="mb-3">Related Product</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            {randomProducts
              .filter((item) => item.category.includes(product.category))
              .map((item) => (
                <Crad
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  listing={item.listing}
                  image={`http://localhost:8000${item.image}`}
                  price={item.price}
                />
              ))}
          </div>
        </section>

        <section className="mb-5">
          <h2 className="mb-3">You May Also Like</h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            {randomProducts.map((product) => (
              <div key={product.id} className="flex-none">
                <Crad
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  listing={product.listing}
                  image={`http://localhost:8000${product.image}`}
                  price={product.price}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className=" h-20 bg-yellow-500 text-black font-semibold">Sale</div>
      <div className="h-screen"></div>
    </>
  );
}
