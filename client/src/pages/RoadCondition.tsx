// @mui
// hooks
// components
import Page from '../components/Page';

import {useState} from "react";
import {Palette} from "react-leaflet-hotline";
import {ChartData} from "chart.js";
import { FAKEROAD_DATA, RENDERER_PALETTE } from "../components/Map/constants";

import ConditionsMap from "../components/RoadConditions/ConditionsMap";
import ConditionsGraph from "../components/RoadConditions/ConditionsGraph";
import RoadProfile from "../components/RoadProfiles/RoadProfile";

import {ConditionType} from "../models/graph";

import {GraphProvider} from "../context/GraphContext";

import "leaflet/dist/leaflet.css"
import "../css/map.css"

import * as React from "react";

// ----------------------------------------------------------------------

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
    const [palette, setPalette] = useState<Palette>(RENDERER_PALETTE)
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
                    <RoadProfile roadData={FAKEROAD_DATA}/>
                    <ConditionsMap type={type} palette={palette} setPalette={setPalette} setWayData={setWayData}/>
                    <ConditionsGraph type={type} palette={palette} data={wayData}/>
                </div>
            </GraphProvider>
        </Page>
    );
}
