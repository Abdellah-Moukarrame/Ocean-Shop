import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import useAuthContext from "../../context/AuthContext";
import Slider from "../../components/Slider";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

export default function Cart() {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price) => {
    if (price == null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const storedCartItems = localStorage.getItem("cartItems");
    const fetchCartItems = async () => {
      const response = await api.get("/api/products");
      const responseData = response.data;
      setProducts(responseData.data);

      if (user) {
        // User is logged in
        if (storedCartItems) {
          // There are items in the local storage
          const cartItems = JSON.parse(storedCartItems);

          try {
            // Send API request to add cart items to the database
            await api.post("/api/cart", cartItems);
            // Clear the local storage
            setLoading(false);
            localStorage.removeItem("cartItems");
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        }
        // Fetch the cart items from the database
        try {
          const response1 = await api.get("/api/cart");
          setCartItems(response1.data.cart);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        setLoading(false);
        // User is not logged in
        setCartItems(JSON.parse(storedCartItems));
      }
    };

    fetchCartItems();
  }, [user]);

  const handleRemoveFromCart = (product_id, cartId) => {
    if (user) {
      const token = localStorage.getItem("token");
      api
        .delete(`http://localhost:8000/api/cart/${cartId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          // Remove the deleted cart item from your React state or props
          const updatedCartItems = cartItems.filter(
            (item) => item.id !== cartId
          );
          setCartItems(updatedCartItems);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const updatedCartItems = cartItems.filter(
        (item) => item.product_id !== product_id
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price ?? item.price;
      const quantity = item.product?.quantity ?? item.quantity;
      return total + price * quantity;
    }, 0);
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => {
      const quantity = Number(item.quantity);
      return total + quantity;
    }, 0);
  };

  if (loading) {
    return (
      <div className=" flex h-screen justify-center items-center z-40">
        <Loader />
      </div>
    );
  }

  const handleDecrement = (cardID) => {
    setCartItems((cart) =>
      cart.map((item) =>
        cardID === item.id
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : item
      )
    );
    updateQuantity(cardID, "dec");
  };

  const handleIncrement = (cardID) => {
    setCartItems((cart) =>
      cart.map((item) =>
        cardID === item.id
          ? { ...item, quantity: item.quantity + (item.quantity < 10 ? 1 : 0) }
          : item
      )
    );
    updateQuantity(cardID, "inc");
  };

  function updateQuantity(cardID, scope) {
    if (user) {
      const token = localStorage.getItem("token");
      api.put(`http://localhost:8000/api/cart/${cardID}/${scope}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
    }
  }

  return (
    <>
      <div className=" lg:h-24 h-28"></div>
      <div className=" lg:container container-fluid">
        <div>
          <h1 className=" font-extrabold">YOUR BAG</h1>
        </div>
        <div>
          {!cartItems?.length ? (
            <>
              <div className=" flex flex-col items-center justify-center h-96">
                <p className=" font-semibold text-lg">
                  Oh No! Your Bag is Empty!
                </p>
                <div>
                  <Link to={"/"}>Shop Now!</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className=" flex flex-col lg:flex-row">
                <div className="flex-auto">
                  <p className=" m-0 text-2xl">
                    Total &#40;{getTotalQuantity()} items&#41;
                    <span className=" font-bold ">
                      MAD{formatPrice(getTotalPrice())}
                    </span>
                  </p>
                  <p className=" italic">
                    Items in your bag are not reserved — check out now to make
                    them yours.
                  </p>
                  {cartItems.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="border-2 border-solid border-black mb-3"
                    >
                      <div className="flex">
                        <div className=" h-full w-1/3 ">
                          <img
                            className="w-full"
                            src={`http://localhost:8000${
                              cartItem.product?.image ?? cartItem.image
                            }`}
                            alt={cartItem.product?.name ?? cartItem.name}
                          />
                        </div>
                        <div className="w-2/3 py-3 px-2 flex flex-col justify-between">
                          <div className="flex justify-between">
                            <div className="w-4/5">
                              <p className="text-lg font-semibold truncate m-0">
                                {cartItem.product?.name ?? cartItem.name}
                              </p>

                              <p className=" m-0">
                                MAD
                                {formatPrice(
                                  (cartItem.product?.price ?? cartItem.price) *
                                    (cartItem.product?.quantity ??
                                      cartItem.quantity)
                                )}
                              </p>
                            </div>
                            <div className="1/5 text-right">
                              <button
                                onClick={() =>
                                  handleRemoveFromCart(
                                    cartItem.product_id,
                                    cartItem.id
                                  )
                                }
                                className="lg:py-2 lg:px-4 px-2 py-1 font-semibold border-2 border-solid border-black hover:border-red-500 hover:bg-red-200 hover:text-red-500"
                              >
                                X
                              </button>
                            </div>
                          </div>

                          <div className=" flex items-center">
                            <p className=" mb-0 mr-2 font-semibold">Quantity</p>

                            <button
                              className="font-bold px-2 border-2 border-black"
                              onClick={() => handleDecrement(cartItem.id)}
                            >
                              -
                            </button>

                            <input
                              className="w-7 border-y-2 text-center border-black"
                              type="number"
                              value={
                                cartItem.product?.quantity ?? cartItem.quantity
                              }
                              disabled
                            />

                            <button
                              className="font-bold px-2 border-2 border-black"
                              onClick={() => handleIncrement(cartItem.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-auto lg:w-8/12 lg:px-3  lg:m-3">
                  <hr className="lg:hidden" />
                  <div className="sticky top-0 lg:pt-5">
                    <div className=" border-2 border-solid p-5 border-black">
                      <h2 className=" font-black">ORDER SUMMARY</h2>
                      <div className=" flex justify-between">
                        <p>{getTotalQuantity()} items</p>
                        <p>MAD{formatPrice(getTotalPrice())}</p>
                      </div>
                      <div className=" flex justify-between">
                        <p>Delivery</p>
                        <p>FREE</p>
                      </div>
                      <hr />
                      <div className=" flex justify-between">
                        <p className=" font-bold">Total price</p>
                        <p className=" font-bold">
                          MAD{formatPrice(getTotalPrice())}
                        </p>
                      </div>
                      <Link to={"/checkout"}>
                        <button className="py-2 px-4 font-semibold text-white bg-black w-full">
                          Checkout →
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <hr />
          <div className="container">
            <Slider
              link={"/product"}
              productData={products}
              title={"YOU MAY ALSO LIKE"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
