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
    type : number
}

const colors = ['rgba(83, 136, 216, 0.6)','rgba(83, 216, 136, 0.6)','rgba(216, 83, 83, 0.6)','rgba(136, 136, 136, 0.6)'];
const names = ['Conditions','Energy','Friction','Altitude']

export default  function Graph({segments,type}:GraphProps){

    const labels = segments.map( segment => "Segment "+(1+segment.segmentId))

    const data = {
    labels: labels,
    datasets: [
        {
            order: 1,
            type: 'bar' as const,
            data: segments.map((segment) => segment.data[type]),
            label: names[type],
            backgroundColor: colors[type],
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