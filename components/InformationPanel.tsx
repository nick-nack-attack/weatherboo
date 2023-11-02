import React from 'react';
import {Root} from "@/typings";
import CityPicker from "@components/CityPicker";
import {weatherCodeToString} from "@/lib/weatherCodeToString";
import Image from "next/image";
import SunInfo from "@components/SunInfo";
import WeatherBooLogo from "@components/WeatherBooLogo";

interface Props {
    city: string;
    lat: string;
    long: string;
    results: Root;
}

const InformationPanel: React.FC<Props> = ({city, lat, long, results}: Props) => {
    return (
        <div className={"bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-10"}>
            <WeatherBooLogo/>

            <CityPicker />

            <hr className={"my-10"} />

            <div className={"mr-14"}>
                <h1 className={"text-6xl font-bold"}>
                    {decodeURI(city)}
                </h1>
                <p className="text-xs text-white/50">
                    Long/Lat: {long}, {lat}
                </p>
            </div>

            <div className={"flex items-center justify-between"}>
                <div>
                    <Image
                        src={`https://www.weatherbit.io/static/img/icons/${weatherCodeToString[results.current_weather.weathercode].icon}.png`}
                        alt={weatherCodeToString[results.current_weather.weathercode].label}
                        width={75}
                        height={75}
                    />

                    <div className={"flex items-center justify-between space-x-10"}>
                        <p className={"text-4xl font-semibold"}>
                            {results.current_weather.temperature.toFixed(1)}{results.daily_units.temperature_2m_max}
                        </p>
                        <p className={"text-right font-extralight text-lg"}>
                            {weatherCodeToString[results.current_weather.weathercode].label}
                        </p>
                    </div>
                </div>
            </div>

            <div className={"space-y-2 py-5"}>
                <SunInfo
                    category={"Sunrise"}
                    time={new Date(results.daily.sunrise[0])}
                />
                <SunInfo
                    category={"Sunset"}
                    time={new Date(results.daily.sunset[0])}
                />
            </div>
        </div>
    );
}

export default InformationPanel;
