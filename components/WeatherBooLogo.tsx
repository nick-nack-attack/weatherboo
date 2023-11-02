import React from 'react';
import Image from "next/image";

const WeatherBooLogo: React.FC = () => {
 return (
     <div className={"flex flex-row items-center space-x-2 pb-4"}>
         <Image
             src={"/weatherboo.svg"}
             alt={"WeatherBoo logo"}
             width={70}
             height={70}
         />
         <h3 className={`text-2xl text-white`}>
             <span className={"font-bold"}>Weather</span>Boo
         </h3>
     </div>
 );
}

export default WeatherBooLogo;
