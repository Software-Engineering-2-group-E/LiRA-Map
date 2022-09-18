import { LeafletEvent, Polyline } from 'leaflet';
import { useMemo } from 'react';
import { Hotline } from "react-leaflet-hotline";
import { HotlineEventFn, HotlineEventHandlers } from "react-leaflet-hotline/lib/types";
import { IRenderer } from "../../../models/renderers";

const handler = (eventHandlers: HotlineEventHandlers | undefined, event: keyof HotlineEventHandlers, opacity: number) => {
    return (e: LeafletEvent, i: number, p: Polyline<any, any>) => {
        p.setStyle( { opacity } )
        if ( eventHandlers && eventHandlers[event] !== undefined )
            (eventHandlers[event] as HotlineEventFn)(e, i, p);
    }
}

function LatLngHotline<T>( {data, getLat, getLng, getVal, options, eventHandlers }: IRenderer<T> )
{
    const handlers = Object.entries(eventHandlers || {}).reduce( (acc, [k, v]) => {
        acc[k as keyof HotlineEventHandlers] = (e: LeafletEvent, i: number, p: Polyline<any, any>) => v(i)(e)
        return acc;
    }, {} as HotlineEventHandlers )

    const _handlers: HotlineEventHandlers = useMemo( () => {
        return {
            ...handlers,
            mouseover: handler(handlers, 'mouseover', 0.5),
            mouseout: handler(handlers, 'mouseout', 0),
        }
    }, [handlers] )

    return <Hotline 
        data={data}
        getLat={getLat}
        getLng={getLng}
        getVal={getVal} 
        options={options}
        eventHandlers={_handlers} />
}

export default LatLngHotline;