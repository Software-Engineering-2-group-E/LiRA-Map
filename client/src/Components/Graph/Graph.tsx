

import { FC, useRef, useState } from "react";
import { Palette } from "react-leaflet-hotline";

import SVGWrapper from "./SVGWrapper";
import Tooltip from "./Tooltip";
import XAxis from "./XAxis";
import YAxis from "./YAxis";

import { Plot, SVG } from "../../assets/graph/types";
import useSize from "../../hooks/useSize";

import Gradient from "./Gradient";
import Labels from "./Labels";
import Line from "./Line";
import useAxis from "./Hooks/useAxis";

import Zoom from "./Zoom";

interface IGraph {
    labelX: string;
    labelY: string;
    plots?: Plot[]
    palette?: Palette;
    absolute?: boolean;
    time?: boolean;
}

const margin = {top: 20, right: 30, bottom: 70, left: 100};
const paddingRight = 50

const Graph: FC<IGraph> = ( { labelX, labelY, plots, palette, absolute, time }  ) => {

    const wrapperRef = useRef(null)
    const [width, height] = useSize(wrapperRef)

    const w = width - margin.left - margin.right;
    const h = height - margin.top - margin.bottom;

    const [zoom, setZoom] = useState<number>(1)

    const { xAxis, yAxis } = useAxis( zoom, w, h );

    return (
        <>
        <Tooltip />
        <div className='graph-wrapper' ref={wrapperRef}>
            
            <Zoom setZoom={setZoom}/>

            <SVGWrapper isLeft={true} zoom={zoom} margin={margin} w={w} height={height}>
                { (svg: SVG) => (
                    <>
                    <Gradient svg={svg} axis={yAxis} palette={palette} />
                    <YAxis svg={svg} axis={yAxis} width={w} height={h} zoom={zoom} absolute={absolute} />
                    <Labels svg={svg} width={w} height={h} labelX={labelX} labelY={labelY} />
                    </>
                ) }
            </SVGWrapper>
           
            <SVGWrapper isLeft={false} zoom={zoom} margin={margin} w={w + paddingRight}  height={height}>
                { (svg: SVG) => (
                    <>
                    <Gradient svg={svg} axis={yAxis} palette={palette} />
                    <XAxis svg={svg} axis={xAxis} width={w} height={h} zoom={zoom} absolute={absolute} time={time} />
                    { plots && plots.map((p: Plot, i: number) => 
                        <Line key={'line-'+i} svg={svg} xAxis={xAxis} yAxis={yAxis} i={i} time={time} {...p} />) 
                    }               
                    </>
                ) }
            </SVGWrapper>
        </div>
        </>
    )
}

export default Graph