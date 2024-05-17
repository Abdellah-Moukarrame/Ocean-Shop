import React, { useState } from "react";
import api from "../api/axios";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const csrf = () => api.get("/sanctum/csrf-cookie");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();

    // Create an object with the form data
    const formData = {
      name,
      email,
      message,
    };

    await api
      .post("/api/contact", formData)
      .then((response) => {
        // Handle the response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
      });
  };
  return (
    <>
      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-center text-gray-800">
          <div className="max-w-[700px] mx-auto px-3 lg:px-6">
            <h2 className="text-3xl font-bold mb-12">Contact us</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-6">
                <input
                  type="text"
                  className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mb-6">
                <input
                  type="email"
                  className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300

            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none"
                  id="exampleInput8"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mb-6">
                <textarea
                  className="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300

            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-sky-600 focus:outline-none
          "
                  id="exampleFormControlTextarea13"
                  rows="3"
                  placeholder="Message"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                className="
          w-full
          px-6
          py-2.5
          bg-black
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
         
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
