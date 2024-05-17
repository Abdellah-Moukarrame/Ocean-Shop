import { Link } from "react-router-dom";
import api from "../../api/axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import {
  ClipboardDocumentCheckIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";

export default function Dashboard() {
  const [userCount, setUserCount] = useState("");
  const [adminCount, setAdminCount] = useState("");
  const [productCount, setProductCount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const userResult = await api.get("/api/user/count");
      setUserCount(userResult.data.userCount);
      setAdminCount(userResult.data.adminCount);

      const productResult = await api.get("/api/product/count");
      setProductCount(productResult.data.count);

      setLoading(false);
    };
    fetchData();
  }, []);

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
      <div className="container h-full">
        <div className=" mb-3 h-screen  font-bold">
          <h2>Dashboard</h2>

          <div className=" grid md:grid-cols-4 gap-3 align-middle">
            <div className=" flex items-center justify-center py-2 px-4 border-solid border-black border-2">
              <UsersIcon className=" h-20 inline-block" />
              <h6> Users: {userCount}</h6>
            </div>
            <div className="  flex items-center justify-center py-2 px-4 border-solid border-black border-2">
              <UserIcon className=" h-20 inline-block" />
              Admins: {adminCount}
            </div>
            <div className="  flex items-center justify-center py-2 px-4 border-solid border-black border-2">
              <div class="material-symbols-outlined text-5xl inline-block">
                steps
              </div>
              <Link to="/productsList">Products: {productCount}</Link>
            </div>
            <div className=" flex items-center justify-center py-2 px-4 border-solid border-black border-2">
              <ClipboardDocumentCheckIcon className=" h-20 inline-block" />
              <Link to="/ordersList"> ORDERS</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
