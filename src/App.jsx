import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"
import * as geolib from "geolib";

const getEstoniaDay = () => {
  const date = new Date();
  return ((date.getDay() + 6) % 7) + 1;
};

const App = () => {
  const [placesData, setPlacesData] = useState(null);
  const currentDay = getEstoniaDay();

  useEffect(() => {
    const fetchPlacesData = async () => {
      try {
        const response = await fetch("/Places.json");
        const data = await response.json();
        setPlacesData(data);
      } catch (error) {
        console.error("Error fetching Places.json:", error);
      }
    };

    fetchPlacesData();
  }, []);

  if (!placesData) {
    return <div>Loading...</div>;
  }

  const time = new Date();
  
  return (
    <>
    <Navbar />
      <div className="flex justify-center mt-8 gap-8 w-full flex-wrap">
        <div className="w-[90%] max-w-[30rem] h-[18rem] bg-[#98b9e5] rounded-xl flex flex-col justify-between">
          <div className="w-full bg-[#134a91] h-[20%] rounded-t-xl flex justify-center items-center">
            <p className="font-extrabold text-xl text-[#98b9e5]">AVATUD</p>
          </div>
          <div className="mx-3 flex items-center justify-between text-[#0b121b]">
            <div>
              <h3 className="text-[2.5rem] font-extrabold">Kütiorg</h3>
              <p className="mt-1 font-medium text-[1.5rem]">Pilet - 22€ / 12€</p>
              <p className="font-medium text-[1.5rem]">Suletakse - 19:00</p>
            </div>
            <div className="w-[25%] h-full flex flex-col items-center">
              <img className="h-full" src="/location.svg" alt="" />
              <p>15 km</p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center h-[15%] gap-1 mb-2">
            <img className="h-[70%]" src="/openinnew.svg" alt="" />
            <p className="font-bold text-[1.5rem] text-[#134a91]">Rohkem infot</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App