export interface Segment {
    id: number;
    positionA: [number, number];
    positionB: [number, number];
    way: number;
}

export interface SegmentWithAggregatedValue extends Segment {
    count: number;
    type: string;
    aggregation: string;
    value: number;
}
