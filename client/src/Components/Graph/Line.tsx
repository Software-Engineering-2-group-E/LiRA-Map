import {FC, useEffect} from "react"

import GLine from "../../assets/graph/line"

import {useGraph} from "../../context/GraphContext";

import {Axis, DotHover, GraphData, SVG} from "../../assets/graph/types"
import {Bounds} from "../../models/path";


interface ILine {
    svg: SVG;
    xAxis: Axis | undefined;
    yAxis: Axis | undefined;
    data: GraphData;
    bounds?: Bounds;
    label: string;
    i: number;
    time: boolean | undefined;
}

const Line: FC<ILine> = ({svg, xAxis, yAxis, data, bounds, label, i, time}) => {

    const {addBounds, remBounds, setDotHover} = useGraph()

    useEffect(() => {

        if (xAxis === undefined || yAxis === undefined) return;

        const _bounds: Required<Bounds> = Object.assign({
            minX: Math.min(...data.map(d => d[0])),
            maxX: Math.max(...data.map(d => d[0])),
            minY: Math.min(...data.map(d => d[1])),
            maxY: Math.max(...data.map(d => d[1])),
        })

        addBounds(label, _bounds)

        const onHover = (d: DotHover | undefined) => d === undefined
            ? setDotHover(undefined)
            : setDotHover({...d, x: d.x / _bounds.maxX})

        const line = new GLine(svg, label, i, data, xAxis, yAxis, onHover, time)

        return () => {
            if (svg === undefined)
                return console.log('ERROR, TRYING TO REMOVE GRAPH DATA WHILE SVG = undefined');

            line.rem()
            remBounds(label)
        }

    }, [svg, xAxis, yAxis, data, label, bounds, i, setDotHover])

    return null

}

export default Line