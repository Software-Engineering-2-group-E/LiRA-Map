
import { FC, useEffect, useMemo, useState } from 'react';
import { LeafletEvent, Polyline } from 'leaflet'
import { HotlineOptions, useCustomHotline } from 'react-leaflet-hotline';

import { useGraph } from '../../../context/GraphContext';

import { Condition, Node, WayId } from '../../../models/path';

import DistRenderer from '../../../assets/hotline/DistRenderer';
import { DistData } from '../../../assets/hotline/hotline';
import HoverHotPolyline from '../../../assets/hotline/HoverHotPolyline';
import { HotlineEventFn, HotlineEventHandlers } from 'react-leaflet-hotline/lib/types';
import useZoom from '../Hooks/useZoom';


const getLat = (n: Node) => n.lat;
const getLng = (n: Node) => n.lng;
const getVal = (n: Node) => n.way_dist;
const getWeight = (z: number | undefined) => z === undefined ? 0 : Math.max(z > 8 ? z - 6 : z - 5, 2)

interface IDistHotline {
    way_ids: WayId[];
    geometry: Node[][];
    conditions: Condition[][];
    options?: HotlineOptions,
    eventHandlers?: HotlineEventHandlers;
}

const handler = (eventHandlers: HotlineEventHandlers | undefined, event: keyof HotlineEventHandlers, opacity: number) => {
    return (e: LeafletEvent, i: number, p: Polyline<any, any>) => {
        p.setStyle( { opacity } )
        if ( eventHandlers && eventHandlers[event] !== undefined )
            (eventHandlers[event] as HotlineEventFn)(e, i, p);
    }
}

const DistHotline: FC<IDistHotline> = ( { way_ids, geometry, conditions, options, eventHandlers } ) => {

    const { dotHover } = useGraph()
    const zoom = useZoom()

    const opts = useMemo( () => ({ 
        ...options, weight: getWeight(zoom)
    }), [options, zoom] )

    const handlers: HotlineEventHandlers = useMemo( () => ({
        ...eventHandlers,
        mouseover: handler(eventHandlers, 'mouseover', 0.5),
        mouseout: handler(eventHandlers, 'mouseout', 0),
    }), [eventHandlers] )

    const { hotline } = useCustomHotline<Node, DistData>( 
        DistRenderer, HoverHotPolyline, 
        { data: geometry, getLat, getLng, getVal, options: opts, eventHandlers: handlers }, 
        way_ids, conditions 
    );
    
    useEffect( () => {
        if ( hotline === undefined ) return;
        (hotline as HoverHotPolyline<Node, DistData>).setHover(dotHover)
    }, [dotHover])

    return null;
}


export default DistHotline;