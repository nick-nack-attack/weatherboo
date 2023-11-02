"use client"

import React from 'react';
import {Card, Color, Metric, Text} from "@tremor/react";

interface Props {
    title: string;
    metric: string;
    unit: string;
    color?: Color;
}

const StatCard: React.FC<Props> = ({title, metric, unit, color}: Props) => {
 return (
     <Card decoration="top" decorationColor={color}>
         <Text>{title} {unit}</Text>
         <Metric>{metric}</Metric>
     </Card>
 );
}

export default StatCard;
