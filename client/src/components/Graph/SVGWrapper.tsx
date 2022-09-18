
import { FC, ReactElement, useEffect, useRef, useState } from "react";
import * as d3 from 'd3'
import { SVG } from "../../assets/graph/types";

interface ISVG {
    isLeft: boolean;
    zoom: number;
    margin: any,
    w: number;
    height: number;
    children: (svg: SVG) => ReactElement;
}

const SVGWrapper: FC<ISVG> = ( props ) => {

    const { isLeft, zoom, margin, w, height, children } = props;
    const ref = useRef(null)
    const [svg, setSVG] = useState<SVG>()
    
    useEffect( () => {

        if ( ref.current === undefined ) return;

        const _svg = d3.select(ref.current)
            .append("g")
            .attr('class', 'svg-g')
            .attr("transform", "translate(" + (isLeft ? margin.left : 3) + "," + margin.top + ")")
            
        setSVG(_svg)

        return () => {
            _svg.selectAll('.svg-g').remove()
        }

    }, [ref, margin, zoom, isLeft])

    return (
        <div 
            className={'svg-container ' + (isLeft ? 'svg-left' : 'svg-right')} 
            style={{height: height + 'px'}}
        >
            <svg ref={ref} style={{width: w * zoom - 20 + (isLeft ? 150 : 0) + 'px', height: '100%'}}>
                { svg && children( svg ) }
            </svg>
        </div>
    )
}

export default SVGWrapper;