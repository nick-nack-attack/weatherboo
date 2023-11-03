"use client"
import React from 'react';
import {Root} from "@/typings";
import {AreaChart, Card, Title} from "@tremor/react";

interface Props {
    results: Root;
}

const HumidityChart: React.FC<Props> = ({results}: Props) => {
    const hourly = results.hourly.time.map(t =>
        new Date(t).toLocaleString("en-US", {
            hour: "numeric",
            hour12: false,
        })).slice(1, 25)

    const data = hourly.map((hr, i) => ({
        "Time": Number(hr),
        "Humidity (%)": results.hourly.relativehumidity_2m[i],
    }))

    const dataFormatter = (n: number) => String(n);

    return (
        <Card>
            <Title>
                Humidity Level
            </Title>
            <AreaChart
                className={"mt-6"}
                data={data}
                showLegend
                index={"Time"}
                categories={["Humidity (%)"]}
                colors={["indigo"]}
                minValue={0}
                maxValue={100}
                valueFormatter={dataFormatter}
                yAxisWidth={40}
            />
        </Card>
    );
}

export default HumidityChart;
