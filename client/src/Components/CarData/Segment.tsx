import { FC, useState } from "react";
import { Marker, Popup } from 'react-leaflet'

import '../../css/rides.css'
import { AggregatedValueInterface, SegmentInterface } from "../../models/models";
import Path from "../Map/Path";
import { PointData } from "../../models/path";
import { PathProperties } from "../../models/properties";
import { RendererName } from "../../models/renderers";

export interface SegmentProps extends SegmentInterface{
    count:number,
    type:string,
    aggregation:string,
    value:number
    onClick?: (props: SegmentProps) => void;
    direction: number
}


const Segment: FC<SegmentProps> = ({id, positionA, positionB, way, count, type, aggregation, value, onClick, direction}) => {
    
    
    const getColor = (val: number, maxval: number, minval: number): string => {
        const v = Math.min(1, Math.max(0, (val - minval) / (maxval - minval))) 
        const green: number = Math.min(v * 2, 1) * 255;
        const red: number = (v < 0.5 ? v +  0.5 : 2 - v * 2) * 255;                 
        return `rgb(${Math.round(green)}, ${Math.round(red)}, 0)`
    }

    const onClickPath = (i: number) => (e: any) => {
        console.log(direction)
        let segmentProps:SegmentProps = {id, positionA, positionB, way, count, type, aggregation, value, direction};
        if(onClick != undefined)
            onClick(segmentProps);
    }

    const getDataPath = () => {
        const pointA: PointData = { lat: positionA[0], lng:  positionA[1] }
        const pointB: PointData = { lat: positionB[0], lng:  positionB[1] }
        return [pointA, pointB];
    }

    const getProperties = () => {
        return { rendererName: RendererName.line, color:getColor(value, 5, 0), width: 4 }
    }

    return(<>
        <Path 
            key={`Segment${Math.random()}`} 
            path={getDataPath()} 
            properties={getProperties()}
            onClick = {onClickPath}
        />
    </>   )
}

export default Segment;