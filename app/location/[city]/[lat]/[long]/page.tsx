import React from 'react';
import {getClient} from "@/apollo/client";
import fetchWeatherQuery from "../../../../../graphql/queries/fetchWeatherQueries";
import {Root} from "@/typings";
import CalloutCard from "@components/CalloutCard";
import StatCard from "@components/StatCard";
import TempChart from "@components/TempChart";
import RainChart from "@components/RainChart";
import HumidityChart from "@components/HumidityChart";
import InformationPanel from "@components/InformationPanel";
import {cleanData} from "@/lib/cleanData";
import {getBasePath} from "@/lib/getBasePath";

export const revalidate = 60;

interface Props {
    params: {
        city: string,
        lat: string,
        long: string,
    }
}

async function Page(props: Props) {
    const client = getClient();

    const {data} = await client.query({
        query: fetchWeatherQuery,
        variables: {
            current_weather: "true",
            longitude: props.params.long,
            latitude: props.params.lat,
            timezone: "auto",
            temperature_unit: "fahrenheit",
            windspeed_unit: "mph",
            precipitation_unit: "inch",
        }
    })

    const results: Root = data.myQuery;
    const dataToSend = cleanData(results, props.params.city);

    const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ weatherData: dataToSend })
    });

    const GPTdata = await res.json();
    const { content } = GPTdata;

    return (
        <div className={"flex flex-col min-h-screen md:flex-row"}>
            <InformationPanel
                city={props.params.city}
                results={results}
                lat={props.params.lat} long={props.params.long}
            />
            <div className="flex-1 p-5 lg:px-8">
                <div className="pb-5">
                    <div className="px-2 py-4">
                            <h2 className="text-xl font-bold">
                                Today&apos;s Overview
                            </h2>
                            <p className="text-sm text-gray-400">
                                Last Updated at: {" "}
                                {new Date(results.current_weather.time).toLocaleString()} ({results.timezone})
                            </p>
                    </div>

                    <div className="m-2 mb-10">
                        <CalloutCard
                            message={content}
                        />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
                        <StatCard
                            title={"Maximum Temperature"}
                            metric={results.daily.temperature_2m_max[0].toFixed(1)}
                            unit={results.daily_units.temperature_2m_max}
                            color={"yellow"}
                        />
                        <StatCard
                            title={"Minimum Temperature"}
                            metric={results.daily.temperature_2m_min[0].toFixed(1)}
                            unit={results.daily_units.temperature_2m_min}
                            color={"green"}
                        />

                        <div>
                            <StatCard
                                title={"UV Index"}
                                metric={results.daily.uv_index_max[0].toFixed(1)}
                                unit={'°'}
                                color={"rose"}
                            />
                            {Number(results.daily.uv_index_max[0].toFixed(1)) > 5 && (
                                <CalloutCard
                                    message={"The UV is high today, be sure to wear SPF!"}
                                    warning
                                />
                            )}
                        </div>

                        <div className="flex space-x-3">
                            <StatCard
                                title={"Wind Speed"}
                                metric={results.current_weather.windspeed.toFixed(1)}
                                unit={results.hourly_units.windgusts_10m}
                                color={"cyan"}
                            />
                            <StatCard
                                title={"Wind Direction"}
                                metric={results.current_weather.winddirection.toFixed(1)}
                                unit={'°'}
                                color={"violet"}
                            />
                        </div>
                    </div>
                </div>
                <hr className="mb-5"/>
                <div className="space-y-3">
                    <TempChart results={results}/>
                    <RainChart results={results}/>
                    <HumidityChart results={results}/>
                </div>
            </div>
        </div>
    );
}

export default Page;
