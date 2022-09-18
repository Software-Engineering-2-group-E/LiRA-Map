import { Circle as LeafletCircle } from "react-leaflet";
import { IRenderer } from "../../../models/renderers";
import { formatEventHandlers } from "../utils";

function Circles<T>( { data, getLat, getLng, options, eventHandlers }: IRenderer<T> ) 
{
    const { width, weight, opacity, color } = options;

    return (
        <>
        { data.map( (t: T, i: number) => 
            <LeafletCircle
                key={`circle-${i}`}
                center={[getLat(t, i), getLng(t, i)]} 
                radius={width} 
                weight={weight}
                opacity={opacity}
                color={color}
                eventHandlers={formatEventHandlers(eventHandlers, i)}/>
        ) }
        </>
    )
}

export default Circles;