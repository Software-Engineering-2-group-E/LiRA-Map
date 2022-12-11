import { Injectable } from '@nestjs/common';
import { json } from 'express';
import { Knex } from 'knex';
import { InjectConnection } from 'nestjs-knex';
import internal from 'stream';
import {
    Segment,
    SegmentWithAggregatedValue,
} from './interfaces/segment.interface';

@Injectable()
export class SegmentsService {
    constructor(@InjectConnection('lira-vis') private readonly knex: Knex) {}

    parseSegments(rowsList: any): Segment[] {
        const res: Segment[] = [];
        rowsList.forEach((row) => {
            const segment = <Segment>{
                id: row.Id,
                positionA: [row.lata, row.lona],
                positionB: [row.latb, row.lonb],
                way: row.Way,
            };
            res.push(segment);
        });
        return res;
    }

    parseSegmentsWithAggregatedValue(
        rowsList: any,
    ): SegmentWithAggregatedValue[] {
        const res: SegmentWithAggregatedValue[] = [];
        rowsList.forEach((row) => {
            const segmentWithAggregatedValue = <SegmentWithAggregatedValue>{
                id: row.Id,
                positionA: [row.lata, row.lona],
                positionB: [row.latb, row.lonb],
                way: row.Way,
                count: row.Count,
                type: row.Type,
                aggregation: row.Aggregation,
                value: row.Value,
                direction: row.Direction,
            };
            res.push(segmentWithAggregatedValue);
        });
        return res;
    }

    async getSegmentsInAPolygon(pointsList: any): Promise<Segment[]> {
        const pointsString =
            pointsList[0] +
            ',' +
            pointsList[1] +
            ',' +
            pointsList[2] +
            ',' +
            pointsList[3] +
            ',' +
            pointsList[0];
        const makePolygon =
            "ST_MakePolygon( ST_GeomFromText('LINESTRING(" +
            pointsString +
            ")'))";
        return await this.knex
            .raw(
                'SELECT "Id", "Way", ST_Y("PositionA") as LonA, ' +
                    'ST_X("PositionA") as LatA, ' +
                    'ST_Y("PositionB") as LonB, ST_X("PositionB") as LatB FROM "Segments" ' +
                    'WHERE ST_Contains(' +
                    makePolygon +
                    ', "PositionA")',
            )
            .then((res) => {
                const segments = this.parseSegments(res.rows);
                return segments;
            });
    }

    async getSegmentsInPolygonWithAggregatedValues(
        pointsList: any,
        type: string,
        aggregation: string,
        direction: number,
    ): Promise<SegmentWithAggregatedValue[]> {
        const typeString = "'" + type + "'";
        const aggregationString = "'" + aggregation + "'";

        const pointsString =
            pointsList[0] +
            ',' +
            pointsList[1] +
            ',' +
            pointsList[2] +
            ',' +
            pointsList[3] +
            ',' +
            pointsList[0];
        const makePolygon =
            "ST_MakePolygon( ST_GeomFromText('LINESTRING(" +
            pointsString +
            ")'))";
        return await this.knex
            .raw(
                'SELECT "Segments"."Id", "Segments"."Way", ST_Y("Segments"."PositionA") as LonA, ' +
                    'ST_X("Segments"."PositionA") as LatA, ' +
                    'ST_Y("Segments"."PositionB") as LonB, ST_X("Segments"."PositionB") as LatB, ' +
                    '"AggregatedValues"."Count", "AggregatedValues"."Type", "AggregatedValues"."Aggregation", "AggregatedValues"."Value", "AggregatedValues"."Direction" ' +
                    'FROM "Segments" INNER JOIN "AggregatedValues" ' +
                    'ON "Segments"."Id" = "AggregatedValues"."Segment" ' +
                    'WHERE "AggregatedValues"."Direction" = ' +
                    direction +
                    ' AND ST_Contains(' +
                    makePolygon +
                    ', "Segments"."PositionA") ' +
                    'AND "AggregatedValues"."Type" = ' +
                    typeString +
                    ' AND "AggregatedValues"."Aggregation" = ' +
                    aggregationString,
            )
            .then((res) => {
                const segments = this.parseSegmentsWithAggregatedValue(
                    res.rows,
                );
                return segments;
            });
    }

    async getSegmentWithAggregatedValue(
        segment_id: number,
        type: string,
        aggregation: string,
    ): Promise<SegmentWithAggregatedValue> {
        const typeString = "'" + type + "'";
        const aggregationString = "'" + aggregation + "'";

        return await this.knex
            .raw(
                'SELECT "Segments"."Id", "Segments"."Way", ST_Y("Segments"."PositionA") as LonA, ' +
                    'ST_X("Segments"."PositionA") as LatA, ' +
                    'ST_Y("Segments"."PositionB") as LonB, ST_X("Segments"."PositionB") as LatB, ' +
                    '"AggregatedValues"."Count", "AggregatedValues"."Type", "AggregatedValues"."Aggregation", "AggregatedValues"."Value", "AggregatedValues"."Direction" ' +
                    'FROM "Segments" INNER JOIN "AggregatedValues" ' +
                    'ON "Segments"."Id" = "AggregatedValues"."Segment" ' +
                    'WHERE "AggregatedValues"."Direction" = -1 AND "Segments"."Id" = ' +
                    segment_id +
                    ' AND "AggregatedValues"."Type" = ' +
                    typeString +
                    ' AND "AggregatedValues"."Aggregation" = ' +
                    aggregationString,
            )
            .then((res) => {
                const segments = this.parseSegmentsWithAggregatedValue(
                    res.rows,
                );
                return segments[0];
            });
    }
}
