import React, { useState, useEffect } from 'react';

const getEstoniaDay = () => {
  const date = new Date();
  // Sunday is 0 in JavaScript, but your JSON starts with Monday as 0
  return (date.getDay() + 6) % 7 + 1;
};

// ... (your existing imports)

const AppTest = () => {
    const [placesData, setPlacesData] = useState(null);
    const currentDay = getEstoniaDay();
  
    useEffect(() => {
      const fetchPlacesData = async () => {
        try {
          const response = await fetch('/Places.json');
          const data = await response.json();
          setPlacesData(data);
        } catch (error) {
          console.error('Error fetching Places.json:', error);
        }
      };
  
      fetchPlacesData();
    }, []);
  
    if (!placesData) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        {Object.keys(placesData).map((key) => {
          const restaurant = placesData[key];
          // Replace the following line with the correct logic to get the opening hours for the current day
          const todayOpeningHours = restaurant[Object.keys(restaurant)[currentDay]];
  
          return (
            <div className="flex justify-center mt-8 gap-8 w-full flex-wrap" key={key}>
              <div className="w-[90%] max-w-[30rem] h-[18rem] bg-[#98b9e5] rounded-xl flex flex-col justify-between" key={key}>
                <div className="w-full bg-[#134a91] h-[20%] rounded-t-xl flex justify-center items-center">
                  <p className="font-extrabold text-xl text-[#98b9e5]">AVATUD</p>
                </div>
                <div className="mx-3 flex items-center justify-between text-[#0b121b]">
                  <div>
                    <h3 className="text-[2.5rem] font-extrabold">{restaurant.name}</h3>
                    <p className="mt-1 font-medium text-[1.5rem]">Pilet - 22€ / 12€</p>
                    <p className="font-medium text-[1.5rem]"></p>
                  </div>
                  <div className="w-[25%] h-full flex flex-col items-center">
                    <img className="h-full" src="/location.svg" alt="" />
                    <p>15 km</p>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center h-[15%] gap-1 mb-2">
                  {todayOpeningHours.open !== 'null' && todayOpeningHours.close !== 'null' ? (
                    <p className="font-bold text-[1.5rem] text-[#134a91]">Open until {todayOpeningHours.close}</p>
                  ) : (
                    <p className="font-bold text-[1.5rem] text-[#ff0000]">Closed today</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default AppTest;
  
  