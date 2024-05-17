import { useEffect, useState } from "react";
import { ArrowLongRightIcon } from "@heroicons/react/20/solid";
import api from "../api/axios";
import { Link, useParams, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const [focusedInput, setFocusedInput] = useState(null);

  const csrf = () => api.get("/sanctum/csrf-cookie");

  useEffect(() => {
    setEmail(searchParams.get("email"));
    console.log(email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
    setErrors([]);
    setStatus(null);
    try {
      const responese = await api.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation,
      });
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
          <p className=" text-2xl font-bold mb-3">Set your new password.</p>

          {status && (
            <p className=" text-center pl-3 border-2 border-green-500 text-green-700 text-sm bg-green-200">
              {status} <Link to="/login">Back to login.</Link>
            </p>
          )}

          <div className="relative mb-3">
            <input
              className={` focus:outline-none focus:ring focus:ring-green-300 border-2  border-solid ${
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

          <div className="relative mb-3">
            <input
              className={` focus:outline-none focus:ring focus:ring-green-300 border-2  border-solid ${
                errors.password_confirmation ? "border-red-500" : "border-black"
              } px-2 py-2 text-lg w-full `}
              type="password"
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
                setErrors({ ...errors, password_confirmation: "" });
              }}
              value={password_confirmation}
              id="password_confirmation"
            />
            <span
              className={`${
                focusedInput === "password_confirmation" ||
                password_confirmation
                  ? "-top-3 text-sm bg-white px-2 text-black"
                  : "top-2 text-base text-gray-400"
              } left-4 absolute transition-all duration-200 z-10`}
            >
              Confirm Password
            </span>
            {errors.password_confirmation && (
              <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                {errors.password_confirmation}
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
