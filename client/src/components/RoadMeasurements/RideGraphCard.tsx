import * as React from 'react';
import {useEffect, useRef, useState} from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SaveIcon from '@mui/icons-material/Save';

import 'date-fns';
import 'chartjs-adapter-date-fns';

import { BoundedPath, MeasMetaPath } from '../../models/path';
import {ActiveMeasProperties} from "../../models/properties";

import {useMarkerContext} from "../../context/MarkerContext";

import {
    Chart as ChartJS,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    Decimation,
    ChartDataset,
    ChartOptions
} from 'chart.js';
import {Chart, getElementAtEvent} from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    Decimation,
);

const RideGraphCard: React.FC<{paths: MeasMetaPath; selectedMeasurements: ActiveMeasProperties[];}> = ({paths, selectedMeasurements}): JSX.Element => {

    const [ open, setOpen ] = useState<boolean>(true)

    const { setPosition } = useMarkerContext();

    const chartRef = useRef(null);

    const [ datasets, setDatasets ] = useState<ChartDataset<'line', Object[]>[]>([]);

    useEffect(() => {
        const datasets: ChartDataset<'line', Object[]>[] = selectedMeasurements
            .filter(({hasValue, name}) => {
                // Make sure hasValue is defined and true
                if(!hasValue) return false

                // Make sure that there exists an object for the measurement type
                if(!paths[name]) return false

                // Make sure 1 or more trips have been selected
                if(!(Object.keys(paths[name]).length > 0)) return false

                //console.log(Object.values(Object.values(paths[name])[0])[0])

                //let bps: BoundedPath[] = Object.values(Object.values(paths[name])[0])

                // Make sure the trip has data (path property)
                // if(!Object.hasOwn(Object.values(paths[name])[0][0], 'path')) return false

                // Make sure that each data point has a value (value property)
                //if(!Object.hasOwn(Object.values(paths[name])[0].path[0], 'value')) return false

                //console.log(name)
                //console.log(Object.values(paths[name])[0].path)

                return true
            })
            .flatMap(({name}) => {
                return Object.values(Object.values(paths[name])[0]).flatMap((trip: BoundedPath) => {
                    const data = trip.path.map((o: any) => ({x: Date.parse(o.metadata.timestamp), y: o.value ? o.value : 0, lat: o.lat, lng: o.lng}))

                    //console.log(`${name} - ${data.length}`)

                    const color = randomColor()

                    const dataset: ChartDataset<'line', Object[]> = {
                        label: name + ' (' + trip.type + ')',
                        data: data,
                        borderColor: color,
                        pointBackgroundColor: color
                    }

                    return dataset
                })
            })
        //console.log("Mapped")
        //console.log(datasets)

        setDatasets(datasets)
    }, [selectedMeasurements, paths]);

    function datasetsToCSV() {
        let contents = ''
        datasets.forEach(dataset => {
            contents += dataset.label + '\n';
            contents += 'Timestamp, Value\n';
            dataset.data.forEach((o: any) => {
                contents += new Date(o.x).toISOString() + ', ' + o.y + '\n'
            })
            contents += '\n'
        })

        return contents
    }

    const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        if(!chartRef.current) return;

        const element = getElementAtEvent(chartRef.current, event);

        if(!element.length) return;

        const { datasetIndex, index } = element[0];

        const o: any = datasets[datasetIndex].data[index]

        setPosition([o.lat, o.lng])
    };

    return (
        <>
            {datasets.length > 0 && (
            <Card sx={{ position: 'absolute', bottom: '20px', right: '10px', zIndex: 1000 }}>
                <CardContent>
                    <IconButton onClick={() => setOpen(!open)}>{ open ? <ExpandMoreIcon/> : <ExpandLessIcon/> }</IconButton>
                    {open && (
                        <>
                            <Button
                                startIcon={<SaveIcon/>}
                                onClick={() => {
                                    const csv = datasetsToCSV()
                                    const blob = new Blob([csv])
                                    const URL_download = URL.createObjectURL(blob)
                                    const link = document.createElement('a')
                                    link.download = 'trip-data.csv'
                                    link.href = URL_download
                                    link.click()
                                }}
                            >
                                Export Data
                            </Button>
                            <div style={{ position: 'relative', width: 'calc(100vw - 625px)', minWidth: '150px' }}>
                                <Chart
                                    ref={chartRef}
                                    type='line'
                                    data={{
                                        datasets: datasets
                                    }}
                                    options={options}
                                    onClick={onClick}
                                />
                            </div>
                        </>)
                    }
                </CardContent>
            </Card>)
            }
        </>
    )
}

const options: ChartOptions<'line'> = {
    maintainAspectRatio: false,
    animation: false,
    parsing: false,
    spanGaps: true,
    plugins: {
        decimation: {
            enabled: true,
            algorithm: 'lttb',
            samples: 200,
            threshold: 200
        },
        legend: {
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
                maxTicksLimit: 10,
                maxRotation: 0
            }
        }
    }
}

function randomColor() {
    return 'rgba(' + (Math.random() * 255) + ',' + (Math.random() * 255) + ',' + (Math.random() * 255) + ', 1)'
}

export default RideGraphCard