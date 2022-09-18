import { FC, useMemo } from "react";
import { Palette } from "react-leaflet-hotline";

import { MeasProperties, ActiveMeasProperties } from "../../models/properties";
import { BoundedPath, MeasMetaPath } from "../../models/path";
import { RideMeta } from "../../models/models";

import PaletteEditor from "../Palette/PaletteEditor";
import { RENDERER_PALETTE } from "../Map/constants";
import MetadataPath from "../Map/MetadataPath";
import MapWrapper from "../Map/MapWrapper";

interface IRidesMap {
    paths: MeasMetaPath;
    selectedMetas: RideMeta[];
    selectedMeasurements: ActiveMeasProperties[];
}

const RidesMap: FC<IRidesMap> = ( { paths, selectedMetas, selectedMeasurements } ) => {

    const memoPaths = useMemo( () => {
        const temp: { meas: MeasProperties, meta: RideMeta, bp: BoundedPath }[] = []
        selectedMeasurements.forEach( meas => {
            const { name } = meas;
            return selectedMetas.forEach( meta => {
                const { TaskId } = meta;
                if ( Object.hasOwn(paths, name) && Object.hasOwn(paths[name], TaskId) )
                    temp.push( 
                        { meas, meta, bp: paths[name][TaskId] }
                    )
            } )
        } )
        return temp;
    }, [paths] )

    return (
        <MapWrapper>
            { memoPaths.map( ({bp, meas, meta}) => bp && 
                <MetadataPath 
                    key={`ride-mp-${meta.TaskId}-${meas.name}`} 
                    path={bp.path} 
                    properties={meas} 
                    metadata={meta} /> 
            ) }
        </MapWrapper>
    )
}

export default RidesMap;