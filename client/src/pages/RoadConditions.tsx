
import { useState } from "react";
import { Palette } from "react-leaflet-hotline";
import { ChartData } from "chart.js";

import ConditionsMap from "../components/RoadConditions/ConditionsMap";
import ConditionsGraph from "../components/RoadConditions/ConditionsGraph";

import { ConditionType } from "../models/graph";

import { GraphProvider } from "../context/GraphContext";



const RoadConditions = () => {
    
    const [palette, setPalette] = useState<Palette>([])
    const [wayData, setWayData] = useState<ChartData<"line", number[], number>>()

    const type: ConditionType = {
        name: 'IRI',
        min: 0,
        max: 10,
        grid: true,
        samples: 40
    }

    return (
        <GraphProvider>
            <div className="road-conditions-wrapper">
                <ConditionsMap type={type} palette={palette} setPalette={setPalette} setWayData={setWayData} />
                <ConditionsGraph type={type} palette={palette} data={wayData} />
            </div>
        </GraphProvider> 
    );
}

export default RoadConditions;