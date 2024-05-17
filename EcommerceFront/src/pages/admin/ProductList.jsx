import { useState, useEffect } from "react";
import api from "../../api/axios";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/products");
        const responseData = response.data;

        setProducts(responseData.data);
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
          <h1>Product List</h1>

          <div className=" flex justify-between">
            <input
              type="text"
              placeholder="Search..."
              className=" border-solid border-black border-2 pl-3 text-base w-50"
              onChange={(e) => setQuery(e.target.value)}
            />

            <button className="py-2 px-4 bg-green-500 ">
              <Link
                className=" no-underline font-semibold text-black"
                to={"/addProduct"}
              >
                Add Product
              </Link>
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {Array.isArray(products) && products.length > 0 ? (
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #ID
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>

                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Category
                        </th>
                        <th scope=" col " className="px-6 py-4">
                          Listing
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products
                        .filter(
                          (product) =>
                            product.name.toLowerCase().includes(query) ||
                            product.category.toLowerCase().includes(query) ||
                            product.listing.toLowerCase().includes(query)
                        )
                        .map((product) => (
                          <tr
                            key={product.id}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-200"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {product.id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                                <img
                                  src={`http://localhost:8000${product.image}`}
                                  alt={product.name}
                                  style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                  }}
                                />
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.name}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              MAD {product.price}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.qty}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.category}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.listing}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              <Link
                                to={`/products/${product.id}/edit`}
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
