
import * as d3 from 'd3'
import { useEffect } from "react";

import { useGraph } from "../../context/GraphContext";
import { ReactAxis } from '../../assets/graph/types';
import { valToTime } from '../../assets/graph/utils';


const XAxis: ReactAxis = ( { svg, axis, width, height, zoom, absolute, time } ) => {

    const { minX, maxX } = useGraph()

    useEffect( () => {
        if ( svg === undefined || axis === undefined ) return;

        const d3Axis = d3
            .axisBottom(axis)
            .tickFormat( (d: d3.NumberValue) => {
                if ( !time ) return d.toString();
                const val = absolute ? (d as number) - minX : minX
                return valToTime(val)
            } )
            .ticks(10 * zoom)
        
        const axisX = svg
            .append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3Axis);

        return () => {
            axisX.remove()
        }
    }, [svg, axis, width, height, minX, maxX, zoom] ) 
    
    return null
}

export default XAxis;