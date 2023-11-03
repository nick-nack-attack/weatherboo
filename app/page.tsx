"use client"

import React from "react";
import {Subtitle} from "@tremor/react";
import CityPicker from "@/components/CityPicker";
import WeatherBooLogo from "@components/WeatherBooLogo";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col justify-center bg-gradient-to-r from-cyan-500 to-blue-500 p-10">
            <div className={"flex flex-col max-w-xl self-center gap-5"}>
                <div>
                    <WeatherBooLogo/>
                    <Subtitle className={"text-white/50"}>Powered by OpenAI</Subtitle>
                </div>
                <div>
                    <CityPicker/>
                </div>
            </div>
        </div>
    )
}
