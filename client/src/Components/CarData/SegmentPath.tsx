import { FC } from "react";

import Path from "../Map/Path";

import { RendererName } from "../../models/renderers";
import { PointData } from "../../models/path";

import { Segment } from "../../models/segment";

import { useSegment } from "../../context/SegmentContext";
import { PathProperties } from "../../models/properties";

export interface ISegment {
    seg: Segment;
    onClick: () => () => void;
    i: number
}

const getColor = (val: number, maxval: number, minval: number): string => {
    const v = Math.min(1, Math.max(0, (val - minval) / (maxval - minval))) 
    const green: number = Math.min(v * 2, 1) * 255;
    const red: number = (v < 0.5 ? v +  0.5 : 2 - v * 2) * 255;                 
    return `rgb(${Math.round(green)}, ${Math.round(red)}, 0)`
}

const SegmentPath: FC<ISegment> = ( { seg, onClick, i } ) => {

    const { segment, segDirection, pathDirection } = useSegment()
    
    const { positionA, positionB, value } = seg;

    const isSelectedSegment = segment?.id === seg.id

    const pointA: PointData = { lat: positionA[0], lng:  positionA[1] }
    const pointB: PointData = { lat: positionB[0], lng:  positionB[1] }
    const path = [pointA, pointB]

    const properties: PathProperties = { 
        rendererName: RendererName.line, 
        color: getColor(value, 5, 0), 
        width: 8,
        arrowHead: (isSelectedSegment ? segDirection : pathDirection) + 1
    }

    return (
        <>
        <Path 
            path={path} 
            properties={properties}
            onClick={onClick}
        />
        </>   
    )
}

export default SegmentPath;