
import { LatLng } from 'Leaflet.MultiOptionsPolyline';
import { Polyline } from 'react-leaflet';
import { IRenderer } from '../../../models/renderers';
import { formatEventHandlers } from '../utils';

function Line<T>( { data, getLat, getLng, options, eventHandlers }: IRenderer<T> )
{
    return <Polyline  
        positions={data.map( (t: T, i: number) => ({lat: getLat(t, i), lng: getLng(t, i) }) )}
        pathOptions={{...options, stroke: true}}
        eventHandlers={formatEventHandlers(eventHandlers, 0)} />
}


export default Line;