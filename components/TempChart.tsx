"use client"
import React from 'react';
import {Root} from "@/typings";
import {AreaChart, Card, Title} from "@tremor/react";

interface Props {
    results: Root;
}

const TempChart: React.FC<Props> = ({results}: Props) => {
    const hourly = results.hourly.time.map(t =>
        new Date(t).toLocaleString("en-US", {
            hour: "numeric",
            hour12: false,
        })).slice(1, 25)

    const data = hourly.map((hr, i) => ({
        "Time": Number(hr),
        "UV Index": results.hourly.uv_index[i],
        "Temperature (°C)": results.hourly.temperature_2m[i],
    }))

    const dataFormatter = (n: number) => `${n}`;

    return (
        <Card>
            <Title>
                Temperature & UV Index
            </Title>
            <AreaChart
                className={"mt-6"}
                data={data}
                showLegend
                index={"Time"}
                categories={["Temperature (°C)", "UV Index"]}
                colors={["yellow", "rose"]}
                minValue={0}
                valueFormatter={dataFormatter}
                yAxisWidth={40}
            />
        </Card>
    );
}

export default TempChart;
