import * as React from 'react';
import {useEffect, useState} from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import 'date-fns';
import 'chartjs-adapter-date-fns';

import {MeasMetaPath} from "../../models/path";
import {ActiveMeasProperties} from "../../models/properties";

import {
    Chart as ChartJS,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    ChartDataset,
    ChartOptions
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
);

const RideGraphCard: React.FC<{paths: MeasMetaPath; selectedMeasurements: ActiveMeasProperties[];}> = ({paths, selectedMeasurements}): JSX.Element | null => {

    const [ datasets, setDatasets ] = useState<ChartDataset<'line', Object[]>[]>([]);

    const colorMap = new Map<string, string>([
        ['Engine RPM', 'rgba(253, 59, 59, 1)'],
    ]);

    useEffect(() => {
        const datasets: ChartDataset<'line', Object[]>[] = selectedMeasurements
            .filter(({hasValue, name}) => {
                return hasValue && paths[name] && Object.keys(paths[name]).length > 0
            })
            .map(({name}) => {
            // Take the first trip
            const trip = Object.values(paths[name])[0];

            const data = trip.path.map(o => ({x: o.metadata.timestamp, y: o.value ? o.value : 0}))

            const dataset: ChartDataset<'line', Object[]> = {
                label: name,
                data: data,
                showLine: true,
                fill: false,
                borderColor: colorMap.get(name) ?? randomColor()
            }

            return dataset
        })

        //console.log("Mapped")
        //console.log(datasets)

        setDatasets(datasets)
    }, [selectedMeasurements, paths]);

    return (
        (datasets.length > 0) ? (
            // TODO: Laura: Style on this card is weird when changing window size
            <Card sx={{ width: 'calc(100vw - 605px)', position: 'absolute', bottom: '10px', right: '10px', zIndex: 1000 }}>
                <CardContent>
                    <Chart
                        type='line'
                        data={{
                            datasets: datasets
                        }}
                        options={options}
                        height={'45vh'}
                    />
                </CardContent>
            </Card>
        ) : null
    );
}

const options: ChartOptions<'line'> = {
    plugins: {
        legend: {
            position: 'top',
            align: 'end',
            labels: {
                usePointStyle: true
            }
        }
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'minute',
                displayFormats: {
                    minute: 'hh:mm'
                }
            },
            ticks: {
                maxTicksLimit: 10
            }
        }
    },
    elements: {
        line: {
            tension : 0.4
        }
    }
}

function randomColor() {
    return 'rgba(' + (Math.random() * 255) + ',' + (Math.random() * 255) + ',' + (Math.random() * 255) + ', 1)'
}

/*
---------------------------- OLD useEffect ----------------------------
if (!selectedMeasurements || selectedMeasurements.length === 0) {
    //console.log("Returned")
    setDatasets([])
    return
}
//console.log("Selected Measurements\n");
//console.log(selectedMeasurements);

const { hasValue, name }: ActiveMeasProperties = selectedMeasurements[0]
if (!hasValue) {
    //console.log("Returned")
    setDatasets([])
    return
}
//console.log("Name\n")
//console.log(name)

if(!paths[name] || Object.keys(paths[name]).length === 0) {
    //console.log("Returned")
    setDatasets([])
    return
}
//console.log("Paths\n")
//console.log(paths[name])

const o = Object.values(paths[name])[0]
//console.log("Object\n")
//console.log(o)

const { path } = o

//console.log("Data\n")
//console.log(path)

const dataset: Object[] = path.map(o => ({x: o.metadata.timestamp, y: o.value ? o.value : 0}))

//console.log("Mapped Data\n")
//console.log(dataset)

const newDataset: ChartDataset<'line', Object[]> = {
    label: 'Engine RPM ',
    data: dataset,
    showLine: true,
    fill: false,
    borderColor: 'rgba(255, 1, 7, 1)'
}

setDatasets([...datasets, newDataset])
*/

export default RideGraphCard