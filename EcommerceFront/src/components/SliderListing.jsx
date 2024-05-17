import { useEffect, useRef, useState } from "react";
import Crad from "./Crad";
import { Link } from "react-router-dom";
import {
  ArrowLongRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function SliderListing({ productData, title, link, listings }) {
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  const randomProducts = shuffledProducts.slice(0, 8);

  useEffect(() => {
    const shuffled = productData.sort(() => 0.5 - Math.random()).slice(0, 8);
    setShuffledProducts(shuffled);
  }, [productData]);

  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    function handleScroll() {
      setScrollPosition(slider.scrollLeft);
    }

    slider.addEventListener("scroll", handleScroll);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function slideLeft() {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  function slideRight() {
    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  }
  return (
    <section className="mb-5 flex flex-col items-center">
      <div className=" container flex justify-between items-end w-full mb-3 p-0 overflow-visible">
        <h2 className=" font-bold lg:text-2xl text-xl">
          <ArrowLongRightIcon className="h-6 w-6 inline " />
          {title}
        </h2>
        <div className=" flex gap-3 items-center ">
          <Link to={link} className=" text-black ">
            <span className="hover:text-white hover:bg-black text-sm p-1">
              View All
            </span>
          </Link>
          <div className=" hidden lg:block">
            <button
              onClick={slideLeft}
              className=" p-2 hover:text-white hover:bg-black"
            >
              <ChevronLeftIcon className=" h-5 w-5" />
            </button>
            <button
              onClick={slideRight}
              className=" p-2 hover:text-white hover:bg-black"
            >
              <ChevronRightIcon className=" h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className=" container relative flex flex-col gap-0 p-0">
        <div
          ref={sliderRef}
          id="slider"
          className=" w-full h-full overflow-x-auto  whitespace-nowrap scroll-smooth "
        >
          {randomProducts
            .filter((item) =>
              item.listing.toLowerCase().includes(listings.toLowerCase())
            )
            .map((item) => (
              <div
                key={item.id}
                className=" lg:w-1/4 md:w-2/6 w-2/5 mx-1 inline-block overflow-auto ease-in-out duration-300 srollbar-md"
              >
                <Crad
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  listing={item.listing}
                  image={`http://localhost:8000${item.image}`}
                  price={item.price}
                  qty={item.qty}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
