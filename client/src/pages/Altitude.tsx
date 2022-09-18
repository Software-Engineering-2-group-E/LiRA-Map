import  { useEffect, useState } from "react";

import Panel from "../components/Altitude/Panel";
import MapWrapper from "../components/Map/MapWrapper";
import Heatmap from "../components/Map/Renderers/Heatmap";
import DistHotline from "../components/Map/Renderers/DistHotline";

import { Node, WaysConditions } from "../models/path";

import { getAltitudes } from "../queries/altitude";

import { HEATMAP_OPTIONS, RENDERER_OPTIONS } from "../components/Map/constants";


const Altitude = () => {
    
    const [altitudes, setAltitudes] = useState<WaysConditions>();
    const [showHotline, setShowHotline] = useState<boolean>(true);
    const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

    useEffect( () => {
        getAltitudes( (data: WaysConditions) => {
            console.log(data);
            setAltitudes( data )
        } )
    }, [] )

    const toggleShowHotline = () => setShowHotline(prev => !prev)
    const toggleShowHeatmap = () => setShowHeatmap(prev => !prev)

    return (
        <div className="altitude-wrapper">
            <MapWrapper>
                <Panel 
                    showHotline={showHotline} 
                    showHeatmap={showHeatmap}
                    toggleShowHotline={toggleShowHotline} 
                    toggleShowHeatmap={toggleShowHeatmap} />
                { showHotline && altitudes 
                    ? <DistHotline 
                        way_ids={altitudes.way_ids} 
                        geometry={altitudes.geometry} 
                        conditions={altitudes.conditions}
                        options={{min: 0, max: 140}} /> 
                    : null 
                }
                { showHeatmap && altitudes 
                    ? <Heatmap
                        data={altitudes.geometry.flat()} 
                        getLat={(t: Node) => t.lat} 
                        getLng={(t: Node) => t.lng} 
                        getVal={(t: Node) => 2} 
                        options={{
                            ...RENDERER_OPTIONS, // temporary fix
                            max: 10,
                            width: 20, 
                            palette: HEATMAP_OPTIONS.palette
                        }} /> 
                    : null }
            </MapWrapper>
        </div>
    );
}

export default Altitude;