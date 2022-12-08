// @mui
import {Container} from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

import {useState} from "react";
import {Palette} from "react-leaflet-hotline";
import {ChartData} from "chart.js";

import ConditionsMap from "../components/RoadConditions/ConditionsMap";
import ConditionsGraph from "../components/RoadConditions/ConditionsGraph";
import RoadProfile from "../components/RoadProfiles/RoadProfile";

import {ConditionType} from "../models/graph";

import {GraphProvider} from "../context/GraphContext";

import "leaflet/dist/leaflet.css"
import "../css/map.css"
//import "../css/road_conditions.css"
//import "../css/palette.css"

import Button from "@mui/material/Button";
import * as React from "react";

// ----------------------------------------------------------------------

////---------------------------------------------------------------------
//Fake roadProfile

function generate(min: number, max: number) {
    return Math.random() * (max - min + 1) + min;
}

const fakeRoad: RoadData = {
    roadId: 797,
    roadName: "Åkandevej",
    segmentList: [{
        segmentId: 0,
        data: [generate(5, 100),generate(5, 100),generate(5, 100),generate(5, 100)]
    }, {
        segmentId: 1,
        data: [generate(5, 100),generate(5, 100),generate(5, 100),generate(5, 100)]
    }, {
        segmentId: 2,
        data: [generate(5, 100),generate(5, 100),generate(5, 100),generate(5, 100)]
    }, {
        segmentId: 3,
        data: [generate(5, 100),generate(5, 100),generate(5, 100),generate(5, 100)]
    }, {
        segmentId: 4,
        data: [generate(5, 100),generate(5, 100),generate(5, 100),generate(5, 100)]
    }, {
        segmentId: 5,
        data: [generate(5, 100),generate(5, 100),generate(5, 100),generate(5, 100)]
    }]

}

////---------------------------------------------------------------------


export interface Segment {
    segmentId: number
    data: number[]
}

export interface RoadData {
    roadId: number
    roadName: string
    segmentList: Segment[]
}


export default function RoadCondition() {
    const {themeStretch} = useSettings();

    const [palette, setPalette] = useState<Palette>([])
    const [wayData, setWayData] = useState<ChartData<"line", number[], number>>()
    const [openRoadProfile, setOpenRoadProfile] = useState(false);

    const type: ConditionType = {
        name: 'IRI',
        min: 0,
        max: 10,
        grid: true,
        samples: 40
    }

    return (
        <Page title="Road Condition">
            <GraphProvider>
                <div className="road-conditions-wrapper">
                    <ConditionsMap type={type} palette={palette} setPalette={setPalette} setWayData={setWayData}/>
                    <ConditionsGraph type={type} palette={palette} data={wayData}/>
                </div>
            </GraphProvider>
            <Button variant="contained"
                    onClick={() => {
                        setOpenRoadProfile(!openRoadProfile);
                    }}
            >
                Open Road Profile
            </Button>
            {openRoadProfile ? <RoadProfile roadData={fakeRoad}/>
                : <p></p>}
        </Page>
    );
}
