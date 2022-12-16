import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nestjs-knex';
import { Knex } from 'knex';

import { PointData, RideMeta } from './rides.dto';
import { BoundedPath } from 'src/models';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class RidesService {
    constructor(@InjectConnection('lira-main') private readonly knex: Knex) {}

    async getRides(): Promise<RideMeta[]> {
        return this.knex
            .select('*')
            .from({ public: 'Trips' })
            .whereNot('TaskId', 0)
            .where('DistanceKm', '>', 0.1)
            .orderBy('TaskId');
    }

    async getRide(tripId: string, dbName: string): Promise<BoundedPath[]> {
        const res = await this.knex
            .select(['message', 'lat', 'lon', 'Created_Date'])
            .from({ public: 'Measurements' })
            .where({ FK_Trip: tripId, T: dbName })
            .whereNot({ lat: null, lon: null });

        let minX = new Date(Number.MAX_SAFE_INTEGER).getTime();
        let maxX = new Date(Number.MIN_SAFE_INTEGER).getTime();
        let minY = Number.MAX_SAFE_INTEGER;
        let maxY = Number.MIN_SAFE_INTEGER;

        const initialMessage = res[0].message;
        const valueRegex = '"(' + dbName + '[a-z.]+)":'; //new RegExp('"(' + dbName + '[a-z.]+)":');
        const matches: string[] = initialMessage.matchAll(valueRegex);

        const bps: BoundedPath[] = [];
        for (const match of matches) {
            const valueTag = match[1];
            const path = res
                .map((msg: any) => {
                    const json = JSON.parse(msg.message);
                    const value = json[valueTag];
                    const timestamp = new Date(msg.Created_Date);

                    minX = Math.min(minX, timestamp.getTime());
                    maxX = Math.max(maxX, timestamp.getTime());
                    minY = Math.min(minY, value);
                    maxY = Math.max(maxY, value);

                    return {
                        lat: msg.lat,
                        lng: msg.lon,
                        value,
                        metadata: { timestamp },
                    } as PointData;
                })
                .sort(
                    (a: PointData, b: PointData) =>
                        a.metadata.timestamp - b.metadata.timestamp,
                );

            bps.push({ type: valueTag, path, bounds: { minX, maxX, minY, maxY } });
        }

        return bps;
    }
}
