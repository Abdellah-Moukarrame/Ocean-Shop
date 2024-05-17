import { useState } from "react";
import useAuthContext from "../context/AuthContext";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import api from "../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);

  const csrf = () => api.get("/sanctum/csrf-cookie");

  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      const responese = await api.post("/forgot-password", { email });
      setStatus(responese.data.status);
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const handleFocus = (event) => {
    setFocusedInput(event.target.id);
  };
  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center h-screen">
        <form onSubmit={handleSubmit}>
          <p className=" text-2xl font-bold m-0">Forgot your password?</p>
          <p>
            Let us know your email address and we will email you a password
            reset link.
          </p>
          {status && (
            <p className=" text-center pl-3 border-2 border-green-500 text-green-700 text-sm bg-green-200">
              {status}
            </p>
          )}
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
                setErrors([]);
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

            {errors && (
              <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                {errors.email}
              </p>
            )}
          </div>

          <div className=" flex flex-col items-center ">
            <button
              className=" group py-2 w-full lg:px-4 lg:w-auto bg-black hover:text-[#67c6c6] text-white font-bold mb-3"
              type="submit"
            >
              <span className="group-hover:text-[#67c6c6] flex gap-1 justify-center items-center hover:opacity-80">
                Reset Password <ArrowLongRightIcon className=" h-5" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
