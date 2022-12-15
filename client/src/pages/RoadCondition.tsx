import * as React from "react";

import Page from '../components/Page';
import ConditionsMap from "../components/RoadConditions/ConditionsMap";
import ConditionsGraph from "../components/RoadConditions/ConditionsGraph";
import RoadProfile from "../components/RoadProfiles/RoadProfile";
import { FAKE_ROAD_DATA, RENDERER_PALETTE } from "../components/Map/constants";

import {useState} from "react";
import {Palette} from "react-leaflet-hotline";
import {ChartData} from "chart.js";

import {ConditionType} from "../models/graph";

import {GraphProvider} from "../context/GraphContext";

import "leaflet/dist/leaflet.css"
import "../css/map.css"

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
                    <div style={{
                        zIndex: 1000,
                        position: 'absolute',
                        marginLeft: 16,
                        marginBottom: 16,
                        bottom: 0
                    }}>
                        <RoadProfile roadData={FAKE_ROAD_DATA} width={'750px'}/>
                    </div>
                    <ConditionsMap type={type} palette={palette} setPalette={setPalette} setWayData={setWayData}/>
                    <ConditionsGraph type={type} palette={palette} data={wayData}/>
                </div>
            </GraphProvider>
        </Page>
    );
}
