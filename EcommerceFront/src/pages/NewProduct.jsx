import { useEffect, useState } from "react";
import api from "../api/axios";
import Crad from "../components/Crad";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";

export default function NewProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        const responseData = response.data;
        setProducts(responseData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="h-24"></div>
      <div className="container h-full ">
        <section className="mb-5">
          <div className=" mb-5">
            <div className=" flex justify-between mb-3">
              <div className=" hidden lg:block">
                <BackButton />
              </div>
              <h2 className="font-semibold">New Products</h2>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                  />
                </svg>
              </div>
            </div>
            <p className=" text-sm text-justify  ">
              Shop for all new styles shoes including casual sneakers,
              high-performance running shoes, and comfy slides. Browse styles
              for
              <span> </span>
              <Link to={"/mens"} className="text-black">
                <span className=" underline hover:font-semibold">mens</span>
              </Link>
              <span> and </span>
              <Link to={"/womens"} className="text-black">
                <span className=" underline hover:font-semibold">womens</span>.
              </Link>
            </p>
          </div>
          {loading && (
            <div className=" flex h-96 justify-center items-center z-40">
              <Loader />
            </div>
          )}
          {error && (
            <div className=" flex h-96 justify-center items-center z-40">
              <p> No Products to display.</p>
            </div>
          )}

          <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter((product) =>
                product.listing.toLowerCase().includes("new")
              )
              .map((product) => (
                <Crad
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  listing={product.listing}
                  image={`http://localhost:8000${product.image}`}
                  price={product.price}
                />
              ))}
          </div>
        </section>
      </div>
    </>
  );
}
