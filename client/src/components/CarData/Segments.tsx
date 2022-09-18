import { FC, useEffect, useState } from "react";
import { LatLng } from "leaflet";

import SegmentPath from "./SegmentPath";
import { useSegment } from "../../context/SegmentContext";
import { Segment } from "../../models/segment";

import { GetSegmentsAndAverageValuesInAPolygon } from "../../queries/DataRequests";


interface ISegments {
    boundaries: LatLng[]
}

const Segments: FC<ISegments> = ( { boundaries } ) => {

    const [segments, setSegments] = useState<Segment[]>([])

    const { pathTypes, pathDirection, setSegment } = useSegment()

    useEffect(() => {

        const { dataType, aggrType} = pathTypes;

        if ( dataType === undefined || aggrType === undefined || pathDirection === undefined )
            return 

        GetSegmentsAndAverageValuesInAPolygon(boundaries, dataType, aggrType, pathDirection)
            .then( setSegments )

    }, [boundaries, pathTypes, pathDirection]);


    const onClick = (seg: Segment) => () => () => setSegment(seg)

    return (
        <>
        { segments.map( (seg: Segment, i: number) =>
            <SegmentPath
                key={`segment-${i}`} 
                i={i}
                seg={seg} 
                onClick={onClick(seg)} 
            />
        ) }
        </>
    )
}

export default Segments;