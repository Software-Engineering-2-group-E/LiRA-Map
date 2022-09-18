import { FC, useEffect } from "react"
import { Color, Palette } from "react-leaflet-hotline";

import { useGraph } from "../../context/GraphContext";
import { Axis, SVG } from "../../assets/graph/types"
import { RENDERER_PALETTE } from "../Map/constants";

export interface IGradient {
    svg: SVG;
    axis: Axis | undefined;
    palette: Palette | undefined;
}

const gradientId = "line-gradient";

const Gradient: FC<IGradient> = ( { svg, axis, palette } ) => {

    const { minY, maxY } = useGraph()

    const p = palette || RENDERER_PALETTE

    useEffect( () => {

        if ( axis === undefined ) return;

        svg
            .append("linearGradient")
            .attr("id", gradientId)
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", axis(minY)) 
            .attr("x2", 0)
            .attr("y2", axis(maxY))
            .selectAll("stop")
            .data(p)
            .enter().append("stop")
            .attr("offset", (c: Color) => (c.t * 100).toString() + '%' )
            .attr("stop-color", (c: Color) => `rgb(${c.r}, ${c.g}, ${c.b})` )

        return () => { 
            svg.select('#' + gradientId).remove() 
        }

    }, [svg, axis, minY, maxY, p])

    return null
}


export default Gradient