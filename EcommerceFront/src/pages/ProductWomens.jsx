import { useEffect, useState } from "react";
import api from "../api/axios";
import Crad from "../components/Crad";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function ProductWomens() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        const responseData = response.data;
        setProducts(responseData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <div className=" h-32"></div>
      <div className="container h-screen">
        <div className="mb-5">
          <BackButton />
        </div>
        <section className="mb-5">
          <div className=" mb-5">
            <h2 className="font-semibold">Womens</h2>
            <p>
              Shop for all styles of women's shoes including casual sneakers,
              high-performance running shoes, and comfy slides. Browse styles
              for
              <span> </span>
              <Link to={"/mens"} className="text-black">
                <span className=" underline hover:font-semibold">mens</span>
              </Link>
              .
            </p>
          </div>
          {products.length === 0 && <p>No products to display.</p>}
          <div className="grid gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter(
                (product) =>
                  product.category.includes("Womens") ||
                  product.category.includes("All")
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
