import React, { useEffect, useState } from "react";

import api from "../api/axios";
import useAuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { user } = useAuthContext();
  const [name, setName] = useState(user?.name);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [number, setNumber] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const formatPrice = (price) => {
    if (price == null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      // Fetch the cart items from the database
      try {
        const response1 = await api.get("/api/cart");
        setCartItems(response1.data.cart);
      } catch (error) {
        console.log(error);
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
    return cartItems.reduce(
      (total, item) =>
        total +
        (item.product?.price ?? item.price) *
          (item.product?.quantity ?? item.quantity),
      0
    );
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => {
      const quantity = Number(item.quantity);
      return total + quantity;
    }, 0);
  };

  const handlePlaceorder = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      address: address,
      email: email,
      number: number,
      barangay: barangay,
      city: city,
      postal: postal,
    };
    try {
      await api.post("/api/placeorder", data);
      navigate("/thankyou");
    } catch (e) {
      console.log(e);
      setErrors(e.response.data.errors);
    }
  };

  return (
    <>
      <div className=" h-20 "></div>
      <div className=" lg:container container-fluid">
        <div>
          <h1 className=" font-extrabold">SHIPPING ADDRESS</h1>
        </div>
        <div>
          <div className=" flex flex-col lg:flex-row">
            <div className="flex-1">
              <form>
                <div className=" mb-3">
                  <label className=" pl-2 font-bold">Name</label>
                  <input
                    className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid px-2 py-2 text-lg w-full `}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && (
                    <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className=" mb-3">
                  <label className=" pl-2 font-bold">Email</label>
                  <input
                    className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid px-2 py-2 text-lg w-full `}
                    type="email"
                    name="name"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className=" mb-3">
                  <label className=" pl-2 font-bold">Phone Number</label>
                  <input
                    className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid px-2 py-2 text-lg w-full `}
                    type="number"
                    name="name"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                  {errors.number && (
                    <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                      {errors.number}
                    </p>
                  )}
                </div>
                <div className="  mb-3">
                  <label className=" pl-2 font-bold">Address</label>
                  <input
                    className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid px-2 py-2 text-lg w-full `}
                    type="text"
                    name="name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && (
                    <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                      {errors.address}
                    </p>
                  )}
                </div>
                <div className="  mb-3">
                  <label className=" pl-2 font-bold">Barangay</label>
                  <input
                    className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid px-2 py-2 text-lg w-full `}
                    type="text"
                    name="name"
                    value={barangay}
                    onChange={(e) => setBarangay(e.target.value)}
                  />
                  {errors.barangay && (
                    <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                      {errors.barangay}
                    </p>
                  )}
                </div>
                <div className="  mb-3">
                  <label className=" pl-2 font-bold">City</label>
                  <input
                    className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid px-2 py-2 text-lg w-full `}
                    type="text"
                    name="name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city && (
                    <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                      {errors.city}
                    </p>
                  )}
                </div>
                <div className="  mb-3">
                  <label className=" pl-2 font-bold">Postal</label>
                  <input
                    className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid px-2 py-2 text-lg w-full `}
                    type="number"
                    name="name"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                  />
                  {errors.postal && (
                    <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                      {errors.postal}
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className="flex-1 lg:px-3  lg:m-3">
              <hr className="lg:hidden" />
              <div className="sticky top-0 ">
                <div className=" border-2 border-solid p-3 lg:p-5 border-black">
                  <div className=" flex justify-center">
                    <img
                      className=" h-16 mb-2"
                      src="logo.svg"
                      alt="ShoeCiety"
                    />
                  </div>
                  <h2 className=" font-black">CHECKOUT</h2>

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
                          <div className="flex flex-col justify-between">
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
                          <div className="flex items-center justify-end">
                            <p className="mr-3 text-lg font-semibold m-0 hidden md:block">
                              X{cartItem.product?.quantity ?? cartItem.quantity}
                            </p>
                            <p className="mr-3 text-sm font-semibold m-0 md:hidden">
                              X{cartItem.product?.quantity ?? cartItem.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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

                  <button
                    onClick={handlePlaceorder}
                    className="py-2 px-4 font-semibold text-white bg-black w-full"
                  >
                    Placeorder →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
