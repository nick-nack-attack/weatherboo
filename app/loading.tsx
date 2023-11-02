import React from 'react';
import {SunIcon} from "@heroicons/react/24/solid";
import WeatherBooLogo from "@components/WeatherBooLogo";
import {Subtitle} from "@tremor/react";
import CityPicker from "@components/CityPicker";

const loading: React.FC = () => {
    return (
        <div className="flex min-h-screen flex-col justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-10">
            <div className={"flex flex-col max-w-xl self-center gap-5 text-white"}>
                <div className={"flex flex-col items-center space-x-5"}>
                    <SunIcon color={"yellow"} className={"h-24 w-24 animate-bounce text-yellow-500"}/>
                    <h1 className={"text-3xl font-bold animate-pulse"}>
                        Loading Weather
                    </h1>
                </div>
                <div>
                    <h2 className={"text-xl font-bold text-center mb-10 animate-pulse"}>
                        Getting city data & AI summary...
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default loading;
