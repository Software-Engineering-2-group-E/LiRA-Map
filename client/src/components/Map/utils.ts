
import { LatLngBounds, LeafletEventHandlerFnMap } from 'leaflet'
import { LeafletEvent } from 'Leaflet.MultiOptionsPolyline'
import { Color, Palette } from 'react-leaflet-hotline'
import { EventHandlers } from '../../models/renderers'

export const toMapBounds = (b: LatLngBounds) => {
    const { lat: maxLat, lng: minLng } = b.getNorthWest()
    const { lat: minLat, lng: maxLng } = b.getSouthEast()
    return { minLat: minLat, maxLat: maxLat, minLng: minLng, maxLng: maxLng }
}

const interpolateColors = (palette: Palette, i: number, x: number): Color => {
    if ( i === 0 ) return { ...palette[0], t: x }
    if ( i === palette.length ) return { ...palette[i - 1], t: x }
    const c1 = palette[i - 1]
    const c2 = palette[i]
    const d1 = x - c1.t;
    const d2 = c2.t - x;
    const D = d1 + d2
    const f1 = 1 - d1 / D
    const f2 = 1 - d2 / D
    return {
        r: c1.r * f1 + c2.r * f2,
        g: c1.g * f1 + c2.g * f2,
        b: c1.b * f1 + c2.b * f2,
        t: x
    };
}

const colorToString = ( {r, g, b}: Color) => `rgb(${r}, ${g}, ${b})`

export const getColorOnPalette = (palette: Palette, pos: number): string => {
    let i: number = 0;
    while ( palette[i].t < pos && ++i < palette.length );
    const color = interpolateColors(palette, i, pos);
    return colorToString(color)
}

export const formatEventHandlers = (handlers: EventHandlers | undefined, i: number) => {
    return Object.entries(handlers || {}).reduce( (acc, [k, v]) => {
        acc[k as keyof LeafletEventHandlerFnMap] = v(i)
        return acc;
    }, {} as { [key in keyof LeafletEventHandlerFnMap]: (e: LeafletEvent) => void } )
}