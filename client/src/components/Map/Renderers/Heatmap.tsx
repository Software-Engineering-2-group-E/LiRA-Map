
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { Palette } from "react-leaflet-hotline";
import L from 'leaflet'
import "leaflet.heat"

import { IRenderer } from "../../../models/renderers";
import { HEATMAP_OPTIONS } from "../constants";

const toHeatPalette = (p: Palette) => p.reduce( (acc, cur) => {
    acc[cur.t] = `rgb(${cur.r}, ${cur.g}, ${cur.b})`
    return acc;
}, {} as {[key: number]: string} )

export interface HeatmapOptions {
    max?: number;
    width?: number;
    palette?: Palette;
}

function Heatmap<T>( { data, getLat, getLng, getVal, options }: IRenderer<T> )
{
    const { max, width, palette } = { ...HEATMAP_OPTIONS, ...options };

    const map = useMap()

    useEffect( () => {
        const points = data.map( (p, i) => [getLat(p, i), getLng(p, i), getVal(p, i)] );

        const layer = (L as any).heatLayer( points, {
            max: max,
            radius: width,
            gradient: toHeatPalette(palette)
        } )

        layer.addTo(map);
        
        return () => layer.remove()
    
    }, [data, options] )

    return null;
}

export default Heatmap;
