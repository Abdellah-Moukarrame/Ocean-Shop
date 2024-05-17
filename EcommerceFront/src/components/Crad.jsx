import React from "react";
import { Link } from "react-router-dom";

export default function Crad(props) {
  const formatPrice = (price) => {
    if (price == null) return "";
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <Link
        className=" no-underline text-black"
        to={`/products/${props.id}/info`}
      >
        <div key={props.id} className="group ">
          <div className="  group-hover:border-solid group-hover:border-black group-hover:border">
            <div className=" relative h-auto w-full">
              <img
                className="aspect-square object-center object-cover "
                src={props.image}
                alt={props.name}
              />

              <div className="absolute top-0 right-1 px-2 py-1 font-bold text-red-500">
                {props.qty == 0 ? "Sold Out" : ""}
              </div>
              <div className="absolute bottom-0 left-1 bg-white px-2 py-1 group-hover:shadow group-hover:mb-2 transition-all duration-200 text-xs font-medium">
                MAD {formatPrice(props.price)}
              </div>
            </div>
            <div className="">
              <ul className=" p-2">
                <li className=" text-base font-semibold truncate  ">
                  {props.name}
                </li>
                <li className=" text-sm text-neutral-400">{props.category}</li>
                <li className=" text-sm font-semibold">{props.listing}</li>
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
