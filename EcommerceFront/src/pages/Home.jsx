import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link, useLocation } from "react-router-dom";
import Crad from "../components/Crad";
import Slider from "../components/Slider";
import SliderListing from "../components/SliderListing";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isMdScreen, setIsMdScreen] = useState(false);
  const location = useLocation();
  const [message, setMessage] = useState(location?.state?.message);
  const [timeoutId, setTimeoutId] = useState(null);
  const [shuffledProducts, setShuffledProducts] = useState([]);

  useEffect(() => {
    if (message) {
      const id = setTimeout(() => {
        setMessage(null);
      }, 3000);
      setTimeoutId(id);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const handleRemoveMessage = () => {
    setMessage(null);
    clearTimeout(timeoutId);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsMdScreen(mediaQuery.matches);

    const handleMediaQueryChange = (e) => {
      setIsMdScreen(e.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);
  const myStyle = {
    /*  backgroundImage: isMdScreen
      ? "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('ezgif.com-webp-to-jpg (2).jpg')"
      : "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0.3)), url('ezgif.com-webp-to-jpg (3).jpg')", */
    height: "screen",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: isMdScreen ? " top " : "top",
  };

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

  const videoMdUrl = "/videos/videoLg.mp4";
  const videoLgUrl = "/videos/videoLg.mp4";

  return (
    <>
      <div className=" h-16"></div>
      <div className="relative">
        {message && (
          <div className=" absolute mx-auto bg-blue-200 text-blue-800 p-2 mb-4 flex justify-between items-center z-30 inset-x-0">
            <div className=" font-bold">{message}</div>
            <button
              className="ml-2 bg-blue-300 px-2 py-1 rounded"
              onClick={handleRemoveMessage}
            >
              X
            </button>
          </div>
        )}
      </div>
      <section className=" h-[500px] md:h-[900px] lg:h-screen">
        <div
          className=" h-full transform transition-transform ease-in-out duration-500 bg-fixed relative  "
          style={{ ...myStyle }}
        >
          {isMdScreen && (
            <video
              autoPlay
              loop
              muted
              className="absolute object-cover h-full w-full"
              style={{ height: "650px", width: "100%" }}
            >
              <source src={videoLgUrl} type="video/mp4" />
              {/* Add additional source tags if you want to support different video formats */}
            </video>
          )}

          {!isMdScreen && (
            <video
              autoPlay
              loop
              muted
              className="absolute object-cover h-full w-full"
              style={{ height: "650px", width: "100%" }}
            >
              <source src={videoMdUrl} type="video/mp4" />
              {/* Add additional source tags if you want to support different video formats */}
            </video>
          )}
          <div className="absolute w-full h-full">
            <div className=" container md:mx-auto h-full lg:pl-10 flex items-center relative">
              <div className="lg:static transform transition-transform ease-in-out duration-500 absolute lg:left-10 md:bottom-10 left-5 md:left-0 bottom-0 ">
                <h1 className=" font-extrabold text-3xl text-white m-0 ">
                  HOME OF CLASSICS
                </h1>
                <p className=" text-sm text-white mb-3">
                  Celebrate timeless classics with Blackpink​.
                </p>
                <div className="flex-col md:flex gap-7">
                  {/* Bouton "Mens" */}
                  
                  
                  <Link to="/womens" className="no-underline text-black">
                    <button className="flex items-center gap-2 mb-4 bg-white font-bold px-4 py-1 text-lg uppercase outline outline-2 outline-white outline-offset-4 hover:text-pink-700 hover:outline-pink-700">
                      <span>Surfboards</span>
                      <ArrowLongRightIcon className="h-6 w-6" />
                    </button>
                  </Link>
                  <Link to="/womens" className="no-underline text-black">
                    <button className="flex items-center gap-2 mb-4 bg-white font-bold px-4 py-1 text-lg uppercase outline outline-2 outline-white outline-offset-4 hover:text-pink-700 hover:outline-pink-700">
                      <span>Wetsuits</span>
                      <ArrowLongRightIcon className="h-6 w-6" />
                    </button>
                  </Link>
                  <Link to="/womens" className="no-underline text-black">
                    <button className="flex items-center gap-2 mb-4 bg-white font-bold px-4 py-1 text-lg uppercase outline outline-2 outline-white outline-offset-4 hover:text-pink-700 hover:outline-pink-700">
                      <span>Accessories</span>
                      <ArrowLongRightIcon className="h-6 w-6" />
                    </button>
                  </Link>
                  <Link to="/womens" className="no-underline text-black">
                    <button className="flex items-center gap-2 mb-4 bg-white font-bold px-4 py-1 text-lg uppercase outline outline-2 outline-white outline-offset-4 hover:text-pink-700 hover:outline-pink-700">
                      <span>Beachwear</span>
                      <ArrowLongRightIcon className="h-6 w-6" />
                    </button>
                  </Link>
                  <Link to="/womens" className="no-underline text-black">
                    <button className="flex items-center gap-2 mb-4 bg-white font-bold px-4 py-1 text-lg uppercase outline outline-2 outline-white outline-offset-4 hover:text-pink-700 hover:outline-pink-700">
                      <span>Surf Gear </span>
                      <ArrowLongRightIcon className="h-6 w-6" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />

      <div className="container  whitespace-nowrap overflow-x-auto scroll-behavior-smooth">
        <Slider
          link={"/product"}
          productData={products}
          title={"BROWSE PRODUCTS"}
        />
        <SliderListing
          listings={"New"}
          link={"/newProducts"}
          productData={products}
          title={"NEW PRODUCTS"}
        />
        <section className="mb-5 flex flex-col items-center">
          <h2 className="mb-3">Best Of TSC</h2>
          <div className="grid gap grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products
              .filter((product) =>
                product.listing.toLowerCase().includes("best")
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
