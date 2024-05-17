import { useState, useEffect } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";

export default function UserOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/orders");
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [setLoading]);

  if (loading) {
    return (
      <div className=" flex h-screen justify-center items-center z-50">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="h-20"></div>
      <div className=" container h-full">
        <div className=" block md:flex justify-between mb-3 container md:pt-5">
          <h1>Your Orders</h1>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {Array.isArray(orders) && orders.length > 0 ? (
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Tracking No.
                        </th>

                        <th scope="col" className="px-6 py-4">
                          mode of payment
                        </th>
                        <th scope="col" className="px-6 py-4">
                          address
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-200"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            {order.tracking_no}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4">
                            {order.payment_mode}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {order.address}
                          </td>
                          <td
                            className={`whitespace-nowrap px-6 py-4 
                            ${
                              order?.status == "pending"
                                ? "text-orange-500"
                                : ""
                            } 
                            ${
                              order?.status == "approve" ? "text-green-500" : ""
                            } 
                            ${order?.status == "decline" ? "text-red-500" : ""} 
                            
                            font-bold`}
                          >
                            {order.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <> No Products Found</>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-20"></div>
    </>
  );
}
