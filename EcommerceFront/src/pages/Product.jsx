import { useEffect, useState } from "react";
import api from "../api/axios";
import Crad from "../components/Crad";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

export default function Product() {
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
      <div className="h-32"></div>
      <div className="container h-full ">
        <section className="mb-5">
          <div className=" mb-5">
            <div className=" flex justify-between items-center mb-3">
              <div className=" hidden lg:block">
                <BackButton />
              </div>
              <h2 className="font-semibold">All Products</h2>
              <div>
                {/*  <AdjustmentsHorizontalIcon className=" h-7 w-7" /> */}
              </div>
            </div>
            
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
            {products.map((product) => (
              <Crad
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                listing={product.listing}
                image={`http://localhost:8000${product.image}`}
                price={product.price}
                qty={product.qty}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
