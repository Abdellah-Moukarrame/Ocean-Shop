import { useState, useEffect } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

export default function OrderLIst() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(orders?.status);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/order");
        const responseData = response.data;

        setOrders(responseData.data);
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

  const handleSubmit = async (event, orderId) => {
    event.preventDefault();

    try {
      await api.put(`/api/placeorder/${orderId}`, { status });
      console.log("Order status updated successfully");
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <>
      <div className="h-20"></div>
      <div className=" container h-full">
        <div className=" block md:flex justify-between mb-3 container md:pt-5">
          <h1>Ordered List</h1>

          <div className=" flex justify-between">
            <input
              type="text"
              placeholder="Search..."
              className=" border-solid border-black border-2 pl-3 text-base w-97"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
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
                          ORDER ID
                        </th>

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
                          status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders
                        .filter(
                          (order) =>
                            order.status.toLowerCase().includes(query) ||
                            order.tracking_no.toString().includes(query) ||
                            order.id.toString().includes(query)
                        )
                        .map((order) => (
                          <tr
                            key={order.id}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-200"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {order.id}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              {order.tracking_no}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              {order.payment_mode}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.address}
                            </td>
                            <td className={` whitespace-nowrap px-6 py-4`}>
                              {order.status}
                            </td>
                            <td
                              className={`whitespace-nowrap px-6 py-4 
                        `}
                            >
                              <Link
                                to={`/ordersList/${order.id}/edit`}
                                className=" no-underline text-white"
                              >
                                <span className="py-2 px-4 bg-black">Edit</span>
                              </Link>
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
