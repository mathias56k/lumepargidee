import React, { useState, useEffect } from 'react';

const getEstoniaDay = () => {
  const date = new Date();
  return (date.getDay() + 6) % 7 + 1;
};

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

    const time = new Date()
  
    return (
      <div>
        {Object.keys(placesData).map((key) => {
          const restaurant = placesData[key];
          const todayOpeningHours = restaurant[Object.keys(restaurant)[currentDay]];
          const currentTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
          const openTime = todayOpeningHours.open !== 'null' ? todayOpeningHours.open.split(':') : null;
          const closeTime = todayOpeningHours.close !== 'null' ? todayOpeningHours.close.split(':') : null;

          const openingDate = openTime ? new Date().setHours(Number(openTime[0]), Number(openTime[1]), 0, 0) : null;
          const closingDate = closeTime ? new Date().setHours(Number(closeTime[0]), Number(closeTime[1]), 0, 0) : null;

          const isOpenNow = openingDate && closingDate && time.getTime() >= openingDate && time.getTime() <= closingDate;

          const nextOpeningDate = new Date();
          nextOpeningDate.setDate(nextOpeningDate.getDate() + 1);
          nextOpeningDate.setHours(openTime[0], openTime[1], 0, 0);

          return (
            <div className="flex justify-center mt-8 gap-8 w-full flex-wrap" key={key}>
              <div className="w-[90%] max-w-[30rem] h-[18rem] bg-[#98b9e5] rounded-xl flex flex-col" key={key}>
                <div className="w-full bg-[#134a91] h-[25%] rounded-t-xl flex justify-center items-center">
                <div className="w-full flex justify-center items-center gap-1 mb-2">
                  {isOpenNow ? (
                    <div className='flex flex-col items-center h-full'>
                      <p className="font-bold text-[1.5rem] text-[#98b9e5]">AVATUD</p>
                      <p className='text-[#98b9e5] mt-[-0.25rem]'>Suletakse {todayOpeningHours.close}</p>
                    </div>
                  ) : (
                <div className='flex flex-col items-center h-full'>
                  <p className="font-bold text-[1.5rem] h-[70%] text-[#CF3438]">SULETUD</p>
                  <p className='text-[#98b9e5] mt-[-0.25rem]'>Avatakse homme {nextOpeningDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              )}
            </div>
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
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default AppTest;
  
  