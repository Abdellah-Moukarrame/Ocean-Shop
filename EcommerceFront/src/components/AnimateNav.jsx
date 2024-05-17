import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import useAuthContext from "../context/AuthContext";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Navigation() {
  const { user, logout } = useAuthContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(100);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  isOpen
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  function handleMouseEnter() {
    setIsOpenDropdown(true);
  }

  function handleMouseLeave() {
    setIsOpenDropdown(false);
  }

  return (
    <>
      <nav
        className={`flex ${
          isScrolled ? "-translate-y-full" : "translate-y-0"
        } fixed justify-between items-center w-full px-3 lg:px-14 bg-white z-40 transform transition-transform ease-in-out duration-500 border border-solid`}
      >
        <div className="lg:hidden flex-1">
          <button className="z-50 lg:hidden" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className=" flex-1 flex justify-center items-center lg:justify-start py-2 lg:p-4">
          <Link className="" to={user?.is_admin ? "/dashboard" : "/"}>
            <img
              className=" w-20 "
              src="../../public/images/logo.svg"
              alt="LOGO"
            />
          </Link>
        </div>

        <ul className="hidden lg:flex flex-1 justify-end mt-3 lg:justify-between lg:items-center h-full p-0 bg-white text-sm uppercase">
          <li>
            <Link
              className=" no-underline font-medium px-3 text-black"
              to={user?.is_admin ? "/dashboard" : "/"}
            >
              <span className="relative group hover:text-[#67c6c6] ">
                {user?.is_admin ? "Dashboard" : "Home"}
                <div className="group-hover:block absolute hidden w-none group-hover:w-full inset-x-0 -bottom-3 h-[3px] bg-black transform transition-transform ease-in-out duration-2000"></div>
              </span>
            </Link>
          </li>
          <li>
            <Link
              className=" no-underline font-medium hover:font-bold px-3 text-black"
              to="/product"
            >
              <span className="relative group hover:text-[#67c6c6] ">
                Products
                <div className="group-hover:block absolute hidden w-full inset-x-0 -bottom-3 h-[3px] bg-black transform transition-transform ease-in-out duration-500"></div>
              </span>
            </Link>
          </li>
          <li>
            <Link
              className=" no-underline font-medium hover:font-bold px-3 text-black"
              to="/about"
            >
              <span className="relative group hover:text-[#67c6c6] ">
                about
                <div className="group-hover:block absolute hidden w-full inset-x-0 -bottom-3 h-[3px] bg-black transform transition-transform ease-in-out duration-500"></div>
              </span>
            </Link>
          </li>
          <li>
            <Link
              className=" no-underline font-medium hover:font-bold px-3 text-black"
              to="/contact"
            >
              <span className="relative group hover:text-[#67c6c6] ">
                contact
                <div className="group-hover:block absolute hidden w-full inset-x-0 -bottom-3 h-[3px] bg-black transform transition-transform ease-in-out duration-500"></div>
              </span>
            </Link>
          </li>
        </ul>

        <div className="flex-1 flex item-center justify-end relative">
          <Link
            className=" no-underline lg:px-3 px-1 text-black  inline-block align-middle "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            to="/account"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </Link>

          {isOpenDropdown && (
            <>
              {user && (
                <div
                  className="hidden lg:block absolute top-6 mt-2 py-2 w-48 bg-white border-solid border-black border-2 shadow-lg z-10"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <>
                    <Link
                      to="/account"
                      className="block no-underline px-4 py-2 text-sm text-black hover:bg-gray-100 hover:font-bold"
                    >
                      <span className=" text-black">Account</span>
                    </Link>

                    <button
                      className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100 w-full text-left  hover:font-bold"
                      onClick={() => {
                        closeMenu();
                        logout();
                      }}
                    >
                      Logout{" "}
                      <ArrowRightOnRectangleIcon className=" h-4 font-bold inline" />
                    </button>
                  </>
                </div>
              )}
            </>
          )}

          {!user?.is_admin ? (
            <>
              <Link
                className=" no-underline lg:px-3 px-1 text-black inline-block align-middle "
                to="/cart"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>

      <div
        className={`fixed lg:hidden top-0 left-0 h-screen w-full bg-white z-50 transform transition-transform ease-in-out duration-500 ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between my-3 border-b-1 border-black ">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center">
            <Link to="/home" onClick={closeMenu}>
              <img
                className=" h-16"
                src="../../public/images/logo.svg"
                alt="LOGO"
              />
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center">
            <button className="px-3" onClick={toggleMenu}>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <hr className="mx-3" />

        <ul className=" mt-3">
          <li className=" mb-3">
            <Link
              className=" no-underline text-xl hover:font-semibold mr-3 text-black "
              to="/"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          {!user?.is_admin && (
            <>
              <li className=" mb-3">
                <Link
                  className=" no-underline text-xl hover:font-semibold mr-3 text-black"
                  to="/about"
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li className=" mb-3">
                <Link
                  className=" no-underline text-xl hover:font-semibold mr-3 text-black"
                  to="/contact"
                  onClick={closeMenu}
                >
                  Contact Us
                </Link>
              </li>
            </>
          )}
          {user?.is_admin ? (
            <>
              <li className=" mb-3">
                <Link
                  className=" no-underline text-xl mr-3 text-black"
                  to="/addProduct"
                  onClick={closeMenu}
                >
                  AddProduct
                </Link>
              </li>
              <li className=" mb-3">
                <Link
                  className=" no-underline text-xl mr-3 text-black"
                  to="/ordersList"
                  onClick={closeMenu}
                >
                  Orders
                </Link>
              </li>
              <li className=" mb-3">
                <Link
                  className=" no-underline text-xl mr-3 text-black"
                  to="/productsList"
                  onClick={closeMenu}
                >
                  Products
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          {user ? (
            <>
              <li className=" mb-3">
                <button
                  className=" no-underline text-xl mr-3 text-black"
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className=" mb-3">
                <Link
                  className=" no-underline text-xl mr-3 text-black"
                  to="/login "
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
              <li className=" mb-3">
                <Link
                  className=" no-underline text-xl mr-3 text-black onClick={closeMenu}"
                  to="/register"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navigation;
