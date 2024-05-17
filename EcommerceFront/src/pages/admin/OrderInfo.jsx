import { useState, useEffect } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function OrderInfo() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [tracking_no, setTracking] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/order/${id}`);
        console.log(response.data.order.name);
        setName(response.data.order.name);
        setAddress(response.data.order.address);
        setEmail(response.data.order.email);
        setName(response.data.order.name);
        setNumber(response.data.order.number);
        setBarangay(response.data.order.barangay);
        setCity(response.data.order.city);
        setPostal(response.data.order.postal);
        setStatus(response.data.order.status);
        setTracking(response.data.order.tracking_no);
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
      navigate("/ordersList");
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  return (
    <>
      <div className="h-20"></div>
      <div className=" container h-full">
        <div className=" block md:flex justify-between mb-3 container md:pt-5">
          <h1>Ordered Info</h1>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <p>Order ID: {id}</p>
              <p>Tracking Number: {tracking_no}</p>
              <p>address: {address}</p>
              <p>status: {status}</p>

              <form onSubmit={(event) => handleSubmit(event, id)}>
                <label htmlFor="status">Set Status:</label>
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="pending">selected {status}</option>
                  <option value="pending">Pending</option>
                  <option value="approve">Approve</option>
                  <option value="cancel">Cancel</option>
                </select>

                <button
                  className="py-2 px-4 bg-black text-white font-bold"
                  type="submit"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-20"></div>
    </>
  );
}
