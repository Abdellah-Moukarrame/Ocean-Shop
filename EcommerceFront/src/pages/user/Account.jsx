import { useEffect } from "react";
import useAuthContext from "../../context/AuthContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Account() {
  const { user } = useAuthContext();

  return (
    <>
      <div className=" h-20"></div>

      <div className="md:container mx-auto mb-3 h-screen lg:p-5 p-1">
        <div className=" border-solid border-black border-2 p-5 h-auto">
          <div className="flex items-center justify-center mb-3">
            <div className="h-36 w-36 relative rounded-full overflow-hidden border-solid border-2 border-black shadow">
              <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="8054251.jpg"
                alt="Profile Image"
              />
            </div>
          </div>
          <div className=" flex flex-col items-center justify-center mb-5">
            <h2 className=" uppercase font-extrabold text-black m-0">
              {user?.name}
            </h2>
            <p className=" text-neutral-400">{user?.email}</p>
          </div>
          <div className="flex justify-center items-center">
            <div className=" grid lg:grid-cols-3 gap-5 text-center ">
              <Link
                className=" no-underline uppercase text-2xl font-semibold text-black "
                to={"/edit"}
              >
                <span className="hover:text-red-500"> Edit Profile</span>
              </Link>
              <Link
                className=" no-underline uppercase text-2xl font-semibold text-black "
                to={"/cart"}
              >
                <span className="hover:text-red-500">Cart</span>
              </Link>
              <Link
                className=" no-underline uppercase text-2xl font-semibold text-black "
                to={"/order"}
              >
                <span className="hover:text-red-500">Orders</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className=" h-20"></div>
    </>
  );
}
