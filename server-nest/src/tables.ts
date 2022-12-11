import { Knex } from 'knex';

interface Way {
    id: string;
    geom: any;
    ref: string;
    official_ref: string;
}

export const Ways = (k: Knex) => k.from<Way>('way');

interface RoadCondition {
    pk: any;
    way_id: string;
    way_dist: number;
    value: number;
    computed_at: Date;
    type: string;
}

export const RoadConditions = (k: Knex) =>
    k.from<RoadCondition>('road_conditions');

interface ZoomCondition extends RoadCondition {
    zoom: number;
}

export const ZoomConditions = (k: Knex) =>
    k.from<ZoomCondition>('zoom_conditions');
