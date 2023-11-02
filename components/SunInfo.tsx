import React from 'react';
import {MoonIcon, SunIcon} from "@heroicons/react/24/solid";

interface Props {
  category: "Sunrise" | "Sunset";
  time: Date;
}

const SunInfo: React.FC<Props> = ({category, time}: Props) => {
 return (
     <div className={"flex flex-items space-x-2 px-4 py-3 border border-white/50 rounded-md bg-white/20"}>
         {
             category === "Sunrise"
                 ? <SunIcon className={"h-10 w-10 text-white-400"} />
                 : <MoonIcon className={"h-10 w-10 text-white-400"}/>
         }
         <div className={"flex-1 flex justify-between items-center"}>
             <p className={""}>
                 {category}
             </p>
             <p className={"uppercase text-2xl"}>
                 {time.toLocaleTimeString("en-US", {
                     hour: "numeric",
                     minute: "numeric",
                     hour12: true
                 })}
             </p>
         </div>
     </div>
 );
}

export default SunInfo;
