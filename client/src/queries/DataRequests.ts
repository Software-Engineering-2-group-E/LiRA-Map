import { LatLng } from "leaflet";
import { Segment } from "../models/segment";


export const GetSegmentsAndAverageValuesInAPolygon = async (points: LatLng[], type: string, aggregation: string, direction: number): Promise<Segment[]> => {

    // const northEastString = points[0].lat + " " + points[0].lng;
    // const southEastString = points[1].lat + " " + points[1].lng;
    // const southWestString = points[2].lat + " " + points[2].lng;
    // const northWestString = points[3].lat + " " + points[3].lng;
    const bounds = points.map( p => p.lat + ' ' + p.lng ).join(';')
    const path = '/segments/polygon/'+ bounds + '?type=' + type +  '&aggregation=' + aggregation +  '&direction=' + direction;
    console.log(path)
    const res = await fetch(path)
    return await res.json();
}


export const GetDataTypes = async (): Promise<string[]> => {
    const path = '/types/aggregatedValues/types'
    const res = await fetch(path);
    const data = await res.json();
    return data.map( (elt: any) => elt.Type );
}

export const GetAggregationTypes = async (dataType: string): Promise<string[]> => {
    const path = `/types/aggregatedValues/aggregation?type=${dataType}`;
    const res = await fetch(path);
    const data = await res.json();
    return data.map( (elt: any) => elt.Aggregation );
}

export const GetDataTypesOfSegment = async (segment_id: number): Promise<string[]> => {
    const path = '/types/aggregatedValues/types/' + segment_id;
    const res = await fetch(path);
    const data = await res.json();
    return data.map( (elt: any) => elt.Type );
}

export const GetAggregationTypesOfSegment = async (dataType: string, segment_id: number): Promise<string[]> => {
    const path = '/types/aggregatedValues/aggregation/' + segment_id + '?type=' + dataType;
    const res = await fetch(path);
    const data = await res.json();
    return data.map( (elt: any) => elt.Aggregation );
}

export const GetSegmentAndAggregateValue = async (type: string, aggregation: string, segment_id: number): Promise<Segment> => {
    const path = '/segments/'+ segment_id + '?type=' + type +  '&aggregation=' + aggregation;
    console.log(path)
    const res = await fetch(path)
    const data = await res.json();
    return data
}