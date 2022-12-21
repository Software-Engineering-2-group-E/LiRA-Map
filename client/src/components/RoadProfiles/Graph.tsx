//Author(s) s204486

import React from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import {Segment} from "../../pages/RoadCondition";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

export interface GraphProps {
    segments : Segment[]
    name : string
    color : string
    value : number
}


export default  function Graph({segments,name,color,value}:GraphProps){

    const labels = segments.map( segment => "Seg "+(1+segment.segmentId))

    const data = {
    labels: labels,
    datasets: [
        {
            order: 1,
            type: 'bar' as const,
            data: segments.map((segment) => segment.data[value]),
            label: name,
            backgroundColor: color,
            borderWidth: 2
        },
    ]
};


    return (
        <Chart
            type='bar'
            data={data}
            options={{
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            }}
            height={80}
        />);
}