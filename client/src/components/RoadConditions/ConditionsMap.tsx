
import { FC, useCallback, useRef } from "react";
import { ChartData } from "chart.js";
import { Palette } from "react-leaflet-hotline";

import MapWrapper from "../Map/MapWrapper";
import { RENDERER_PALETTE } from "../Map/constants";
import PaletteEditor from "../Palette/PaletteEditor";
import Ways from "./Ways";

import useSize from "../../hooks/useSize";

import { ConditionType } from "../../models/graph";
import { Condition } from "../../models/path";

import { getConditions } from "../../queries/conditions";


interface Props {
    type: ConditionType;
    palette: Palette;
    setPalette: React.Dispatch<React.SetStateAction<Palette>>;
    setWayData: React.Dispatch<React.SetStateAction<ChartData<"line", number[], number> | undefined>>;
}

const ConditionsMap: FC<Props> = ( { type, palette, setPalette, setWayData } ) => {

    const { name, max, grid, samples } = type;

    const ref = useRef(null);
    const [width, _] = useSize(ref)

    const onClick = useCallback( (way_id: string, way_length: number) => {
        console.log('onclick called');
        
        getConditions( way_id, name, (wc: Condition[]) => {
            console.log('getConditions called');
            setWayData( {
                labels: wc.map( p => p.way_dist * way_length ),
                datasets: [ {
                    type: 'line' as const,
                    label: way_id,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1,
                    data: wc.map( p => p.value ),
                } ]
            } )
        } )
    }, [] )

    return (
        <div className="road-conditions-map" ref={ref}>
            <PaletteEditor 
                defaultPalette={RENDERER_PALETTE}
                width={width}
                cursorOptions={ { scale: max, grid, samples } }
                onChange={setPalette} />

            <MapWrapper>
                <Ways palette={palette} type={name} onClick={onClick}/>
            </MapWrapper>
        </div>
    )
}

export default ConditionsMap;