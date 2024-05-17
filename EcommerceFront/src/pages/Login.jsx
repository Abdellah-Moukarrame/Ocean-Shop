import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Loader from "../components/Loader";
import api from "../api/axios";
import useAuthContext from "../context/AuthContext";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function Login() {
  const [focusedInput, setFocusedInput] = useState(null);
  const location = useLocation();
  const [message, setMessage] = useState(location?.state?.message);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (message) {
      const id = setTimeout(() => {
        setMessage(null);
      }, 3000);
      setTimeoutId(id);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const handleRemoveMessage = () => {
    setMessage(null);
    clearTimeout(timeoutId);
  };

  const handleFocus = (event) => {
    setFocusedInput(event.target.id);
  };
  const handleBlur = () => {
    setFocusedInput(null);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const csrf = () => api.get("/sanctum/csrf-cookie");
  const { getUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    await csrf();
    try {
      await api.post("/login", data);
      await getUser();

      navigate("/verify");
      setLoading(false);
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className=" flex h-screen justify-center items-center z-40">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className=" h-20"></div>

      <div className="container lg:flex h-full">
        {message && (
          <div className=" absolute mx-auto bg-blue-200 text-blue-800 p-2 mb-4 flex justify-between items-center z-50 inset-x-0">
            <div className=" font-bold">{message}</div>
            <button
              className="ml-2 bg-blue-300 px-2 py-1 rounded"
              onClick={handleRemoveMessage}
            >
              X
            </button>
          </div>
        )}
        <div className=" flex-1 mb-5">
          <div className="sticky top-0 pt-5">
            <h2 className=" font-bold mb-5">LOGIN</h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-3">
                <input
                  className={` focus:outline-none focus:ring focus:ring-[#67c6c6] border-2  border-solid ${
                    errors.email ? "border-red-500" : "border-black"
                  } px-2 py-2 text-lg w-full `}
                  type="email"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "" });
                  }}
                  value={email}
                  id="email"
                />
                <span
                  className={`${
                    focusedInput === "email" || email
                      ? "-top-3 text-sm bg-white px-2 text-black"
                      : "top-2 text-base text-gray-400"
                  } left-4 absolute transition-all duration-200 z-10`}
                >
                  Email
                </span>

                {errors.email && (
                  <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative mb-3">
                <input
                  className={` focus:outline-none focus:ring focus:ring-[#67c6c6] border-2  border-solid ${
                    errors.password ? "border-red-500" : "border-black"
                  } px-2 py-2 text-lg w-full `}
                  type="password"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "" });
                  }}
                  value={password}
                  id="password"
                />
                <span
                  className={`${
                    focusedInput === "password" || password
                      ? "-top-3 text-sm bg-white px-2 text-black"
                      : "top-2 text-base text-gray-400"
                  } left-4 absolute transition-all duration-200 z-10`}
                >
                  Password
                </span>

                {errors.password && (
                  <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className=" flex flex-col items-center ">
                <button
                  className=" group py-2 w-full lg:px-4 lg:w-auto bg-black hover:text-[#67c6c6] text-white font-bold mb-3"
                  type="submit"
                >
                  <span className="group-hover:text-[#67c6c6] flex gap-1 justify-center items-center hover:opacity-80">
                    LOGIN <ArrowLongRightIcon className=" h-5" />
                  </span>
                </button>

                <p>
                  <Link
                    className="text-black underline font-medium"
                    to={"/forgotPassword"}
                  >
                    Forgot Password?
                  </Link>
                </p>

                <p>
                  Don't have an account yet?{" "}
                  <Link
                    className="text-black underline font-medium"
                    to={"/register"}
                  >
                    Signup here.
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <hr className="lg:hiddden" />
        <div className=" flex-1 ">
          <div className=" flex flex-col justify-center items-center lg:ml-3">
            <img className="w-full mb-2" src="bg.jpg" alt="scioclub" />
            <div>
              <h2 className=" w-full font-bold">
                JOIN SCIOCLUB. GET REWARDED TODAY.
              </h2>
              <p className=" text-justify">
                As an scioClub member you get rewarded with what you love for
                doing what you love. Sign up today and receive immediate access
                to these Level 1 benefits:
              </p>
              <ul>
                <li>
                  <CheckIcon className="h-5 inline" /> Free delivery
                </li>
                <li>
                  <CheckIcon className="h-5 inline" /> A 15% off voucher for
                  your next purchase
                </li>
                <li>
                  <CheckIcon className="h-5 inline" /> Access to Members Only
                  products and sales
                </li>
                <li>
                  <CheckIcon className="h-5 inline" />
                  Special offers and promotions
                </li>
                <li>
                  <CheckIcon className="h-5 inline" />
                  Special offers and promotions
                </li>
              </ul>
              <p className=" text-justify">
                Join now to start earning points, reach new levels and unlock
                more rewards and benefits from adiClub.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-32"></div>
    </>
  );
}
