import { Injectable } from '@nestjs/common';
import { InjectConnection, Knex } from 'nestjs-knex';

import {
    LatLngDist,
    WaysConditions,
    Condition,
    ValueLatLng,
    WayId,
} from 'src/models';
import { Ways } from '../tables';
import groupBy from '../util';

import { Altitudes } from './alt.tables';

@Injectable()
export class AltitudeService {
    constructor(@InjectConnection('postgis') private readonly knex: Knex) {}

    private async getWays(
        way_ids: string[],
    ): Promise<{ [key: WayId]: LatLngDist[] }> {
        const ways: any[] = await Ways(this.knex)
            .select(
                this.knex.raw(
                    "cast(id as text) as way_id, ST_AsGeoJSON((ST_DumpPoints(geom)).geom)::json->'coordinates' as pos, ST_LineLocatePoint(geom, (ST_DumpPoints(geom)).geom) as way_dist",
                ),
            )
            .whereIn('id', way_ids);

        return groupBy<any, LatLngDist>(ways, 'way_id', (cur: any) => ({
            lat: cur.pos[1],
            lng: cur.pos[0],
            way_dist: cur.way_dist,
        }));
    }

    private async getAltitudes(): Promise<{ [key: WayId]: Condition[] }> {
        const altitudes: any[] = await Altitudes(this.knex).select(
            this.knex.raw('cast(way_id as text), way_dist, altitude'),
        );

        return groupBy<any, Condition>(altitudes, 'way_id', (cur: any) => ({
            value: cur.altitude,
            way_dist: cur.way_dist,
        }));
    }

    async getHeatAltitudes(): Promise<ValueLatLng[]> {
        return await this.knex()
            .select(this.knex.raw('altitude as value, x as lng, y as lat'))
            .from(
                this.knex.raw(
                    'altitude, getCoord(cast(way_id as character varying), way_dist)',
                ),
            );
    }

    async getAltitudesConditions(): Promise<WaysConditions> {
        const altitudes = await this.getAltitudes();
        const way_ids = Object.keys(altitudes);
        const ways = await this.getWays(way_ids);

        return way_ids.reduce(
            (acc, way_id) => {
                acc.way_ids.push(way_id);
                acc.geometry.push(ways[way_id]);
                acc.conditions.push(altitudes[way_id]);
                return acc;
            },
            { way_ids: [], geometry: [], conditions: [] } as WaysConditions,
        );
    }
}
