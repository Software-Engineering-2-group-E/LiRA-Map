
import { Rectangle as LeafletRectangle } from "react-leaflet";
import { LatLngBounds } from 'leaflet'

import { IRenderer } from "../../../models/renderers";
import { formatEventHandlers } from "../utils";


function Rectangles<T>( { data, getLat, getLng, options, eventHandlers }: IRenderer<T> )
{
    const { width, color, weight, opacity } = options;

    const size: number = width / 10_000;
        
    return (
        <>
        { data.map( (t: T, i: number) => {

            const lat = getLat(t, i)
            const lng = getLng(t, i) 

            const bounds: LatLngBounds = new LatLngBounds(
                [lat - size / 2, lng - size / 2],
                [lat + size / 3, lng + size / 1.2]
            );

            return <LeafletRectangle
                key={`rectangle-${i}`}
                bounds={bounds} 
                color={color}
                weight={weight}
                opacity={opacity}
                eventHandlers={formatEventHandlers(eventHandlers, i)} />
            } )
        }
        </>
    )
}

export default Rectangles
