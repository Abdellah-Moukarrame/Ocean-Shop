import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import BackButton from "../../components/BackButton";
import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("All");
  const [listing, setListing] = useState("New");

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("qty", quantity);
    data.append("image", image);
    data.append("category", category);
    data.append("listing", listing);

    try {
      const response = await api.post("/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 5000,
      });
      console.log(data);
      console.log(response.data);
      setSuccess(true);
    } catch (e) {
      console.log(e);
      if (e.response.status === 422) {
        setError(e.response.data.errors);
      }
    }
  };

  return (
    <>
      <div
        className={` ${
          success
            ? " fixed bg-black opacity-80 left-0 h-full w-full z-10"
            : "hidden"
        }`}
      ></div>
      <div className="h-20"></div>

      <div className="container">
        <div>
          <div>
            <h1 className=" text-center">Add Product</h1>
            <div className=" text-center">
              <BackButton />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className=" pl-2 font-bold">Name</label>
              <input
                className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid ${
                  error.name ? "border-red-500" : "border-black"
                } px-2 py-2 text-lg w-full `}
                type="text"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError({ ...error, name: "" });
                }}
              />
              {error.name && (
                <p className="pl-3 border-3 font-semibold text-red-500 text-sm">
                  {error.name[0]}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label className=" pl-2 font-bold">Description</label>

              <textarea
                className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid ${
                  error.description ? "border-red-500" : "border-black"
                } px-2 py-2 text-lg w-full `}
                type="text"
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError({ ...error, description: "" });
                }}
              />

              {error.description && (
                <p className="pl-3 border-3 font-semibold text-red-500 text-sm">
                  {error.description[0]}
                </p>
              )}
            </div>

            <div className="grid gap-3 grid-cols-1 md:grid-cols-4 mb-3">
              <div className=" flex flex-col">
                <label className=" pl-2 font-bold">Price</label>
                <input
                  className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid ${
                    error.price ? "border-red-500" : "border-black"
                  } px-2 py-2 text-lg w-full `}
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setError({ ...error, price: "" });
                  }}
                />
                {error.price && (
                  <p className="pl-3 border-3 font-semibold text-red-500 text-sm">
                    {error.price[0]}
                  </p>
                )}
              </div>
              <div className=" flex flex-col">
                <label className=" pl-2 font-bold">Quantity</label>
                <input
                  className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid ${
                    error.quantity ? "border-red-500" : "border-black"
                  } px-2 py-2 text-lg w-full `}
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setError({ ...error, quantity: "" });
                  }}
                />
                {error.price && (
                  <p className="pl-3 border-3 font-semibold text-red-500 text-sm">
                    {error.quantity[0]}
                  </p>
                )}
              </div>
              <div className=" flex flex-col">
                <label htmlFor="category" className=" pl-2 font-bold">
                  Category
                </label>
                <select
                  className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid ${
                    error.category ? "border-red-500" : "border-black"
                  } px-2 py-2 text-lg w-full `}
                  name="category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setError({ ...error, category: "" });
                  }}
                >
                  <option value="All">All</option>
                  <option value="Mens">Mens</option>
                  <option value="Womens">Womens</option>
                  <option value="Kids">Kids</option>
                  <option value="Surfboards">Surfboards</option>
                  <option value="Wetsuits">Wetsuits and Rash Guards</option>
                  <option value="Accessories">Surf Accessories</option>
                  <option value="Apparel">Apparel and Beachwear</option>
                  <option value="Gear">Surf Gear and Equipment</option>
                </select>
                {error.category && (
                  <p className="pl-3 border-3 font-semibold text-red-500 text-sm">
                    {error.category[0]}
                  </p>
                )}
              </div>
              <div className=" flex flex-col">
                <label htmlFor="listing" className=" pl-2 font-bold">
                  Listing
                </label>
                <select
                  className={` focus:outline-none focus:ring focus:ring-blue-300 border-2  border-solid ${
                    error.listing ? "border-red-500" : "border-black"
                  } px-2 py-2 text-lg w-full `}
                  name="listing"
                  value={listing}
                  onChange={(e) => {
                    setListing(e.target.value);
                    setError({ ...error, listing: "" });
                  }}
                >
                  <option value="New">New</option>
                  <option value="Featured">Featured</option>
                  <option value="Best">Best</option>
                  <option value="None">None</option>
                </select>
                {error.listing && (
                  <p className="pl-3 border-3 font-semibold text-red-500 text-sm">
                    {error.listing[0]}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-3 flex flex-col justify-center">
              <div className=" flex flex-col mb-3 ">
                <label className=" pl-2 font-bold">Image</label>
                <input
                  className={` focus:outline-none focus:ring focus:ring-violet-300 border-2  border-solid ${
                    error.image ? "border-red-500" : "border-black"
                  } px-2 py-2 text-lg w-full `}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setError({ ...error, image: "" });
                  }}
                />
                {error.image && (
                  <p className="pl-3 border-3 font-semibold text-red-500 text-sm">
                    {error.image[0]}
                  </p>
                )}
              </div>

              <div className=" border-solid border-black border-2  p-3">
                <p className=" font-bold">Image Preview</p>
                <div className="flex justify-center">
                  {image && (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Product Image Preview"
                      style={{ maxWidth: "300px", maxHeight: "300px" }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className=" text-center">
              <button
                className=" py-2 px-4 bg-black text-white font-semibold hover:opacity-90 hover:text-neutral-400"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {success && (
        <div className="fixed h-full inset-0 flex items-center justify-center z-20">
          <div className=" bg-white p-5 flex flex-col items-center border-solid border-black border-2">
            <h2 className=" mb-3">Added Succesfully...</h2>
            <button
              className="mx-2 px-4 py-2 border-solid border-black border-2 font-semibold hover:bg-black hover:text-white"
              type="button"
              onClick={() => navigate("/productsList")}
            >
              Ok
            </button>
          </div>
        </div>
      )}
      <div className=" h-96"></div>
    </>
  );
}
