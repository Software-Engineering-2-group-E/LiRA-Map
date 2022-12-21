//@Author(s) s204433

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

function generate(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
}

function getDatesInRange(start : Date, end : Date) {
    const date = new Date(start.getTime());

    let dates = [];

    while(date <= end) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }

    // Format dates to preferred format
    const date_format = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    dates = dates.map((date) => date_format.format(date));

    //console.log(dates);

    return dates;
}

const labels = getDatesInRange(new Date(new Date().setDate(new Date().getDate() - 30)), new Date());

export const data = {
    labels: labels,
    datasets: [
        {
            order: 2,
            type: 'bar' as const,
            data: labels.map(() => generate(10, 100)),
            label: 'Metric A',
            backgroundColor: 'rgba(83, 136, 216, 0.6)',
            borderWidth: 2
        },
        {
            order: 1,
            type: 'line' as const,
            data: labels.map(() => generate(5, 100)),
            label: 'Metric B',
            borderColor: 'rgba(253, 59, 59, 1)',
            borderWidth: 3,
            fill: false,
            lineTension: 0.4
        }
    ]
};


export default function RoadConditionsChart() {
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