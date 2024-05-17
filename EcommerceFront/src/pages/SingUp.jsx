import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [success, setSucces] = useState(false);
  const navigate = useNavigate();
  const csrf = () => api.get("/sanctum/csrf-cookie");
  const handleFocus = (event) => {
    setFocusedInput(event.target.id);
  };
  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("password_confirmation", password_confirmation);

    await csrf();
    try {
      setErrors({});
      await api.post("/register", data);
      /*   await api.post("/logout"); */
      setSucces(true);
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div
        className={` ${
          success
            ? "absolute bg-black opacity-80 left-0 h-full w-full z-20"
            : "hidden"
        }`}
      ></div>
      <div className=" h-20"></div>
      <div className="container lg:flex pt-10 ">
        <div className=" flex-1">
          <h2 className=" font-bold mb-5">SIGN UP</h2>
          <form onSubmit={handleSubmit} method="post">
            <div className="relative mb-3">
              <input
                className={` focus:outline-none focus:ring focus:ring-green-300 border-2  border-solid ${
                  errors.name ? "border-red-500" : "border-black"
                } px-2 py-2 text-lg w-full `}
                type="text"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: "" });
                }}
                value={name}
                id="name"
              />
              <span
                className={`${
                  focusedInput === "name" || name
                    ? "-top-3 text-sm bg-white px-2 text-black"
                    : "top-2 text-base text-gray-400"
                } left-4 absolute transition-all duration-200 z-10`}
              >
                Username
              </span>

              {errors.name && (
                <p className="pl-3 border-3 border-red-500 text-red-500 text-sm">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="relative mb-3">
              <input
                className={` focus:outline-none focus:ring focus:ring-green-300 border-2  border-solid ${
                  errors.email ? "border-red-500" : "border-black"
                } px-2 py-2 text-lg w-full `}
                type="text"
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
                  errors.password_confirmation
                    ? "border-red-500"
                    : "border-black"
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

            <div>
              <input
                type="checkbox"
                className=" inline-block"
                onChange={handleCheckboxChange}
              />
              <span>
                I acknowledge that I have read and understood the shoeciety{" "}
                <Link to={"/privacypolicy"}>Privacy Policy</Link> (as may be
                updated from time to time), and hereby agree to be bound by such
                terms.
              </span>
            </div>

            <div className=" flex flex-col items-center ">
              <button
                className=" py-2 w-full lg:px-4 lg:w-auto bg-black text-white font-bold mb-5"
                type="submit"
                disabled={!isChecked}
              >
                SIGN UP
              </button>
              <div>
                <p>
                  Already have an account?{" "}
                  <Link
                    className="text-black underline font-medium"
                    to={"/login"}
                  >
                    Login here.
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div className=" flex-1 flex items-center justify-center p-5">
          <img className=" h-auto " src="/images/logo.svg" alt="LOGO" />
        </div>
      </div>

      {success && (
        <div className="fixed h-full inset-0 flex items-center justify-center z-20">
          <div className=" bg-white p-5 flex flex-col items-center border-solid border-black border-2">
            <h2 className=" mb-3">
              Please Check Your Email to verify your Email
            </h2>
            <button
              className="mx-2 px-4 py-2 border-solid border-black border-2 font-semibold hover:bg-black hover:text-white"
              type="button"
              onClick={() => navigate("/register")}
            >
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
}
