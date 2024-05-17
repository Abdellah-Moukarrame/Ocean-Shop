import React from "react";
import about_pic from "../../public/images/about_pic.jpg";
export default function About() {
  return (
    <>
      <div className="h-20"></div>
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-sm lg:text-base">
          <h1 className="text-black font-bold text-2xl">About Us</h1>
          <div className="flex justify-center w-full">
            <img className="h-60 mb-2" src="/images/logo.svg" alt="LOGO" />
          </div>
          <p className="font-semibold text-justify">
            Bienvenue chez OceanShop : Votre destination de surf ultime.
            Découvrez notre sélection soignée d'équipements, vêtements et
            accessoires de haute qualité pour vivre pleinement votre passion.
            Trouvez tout ce dont vous avez besoin pour surfer avec style et
            confort chez OceanShop !
          </p>
          <div className="mt-4 max-w-screen-lg w-full flex justify-center">
            <img
              src={about_pic}
              width="100%"
              height="450"
              style={{ width: "400px", height: "500px", border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
}
