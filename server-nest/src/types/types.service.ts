import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nestjs-knex';
import { Knex } from 'knex';

@Injectable()
export class TypesService {
    constructor(@InjectConnection('lira-vis') private readonly knex: Knex) {}

    async getAggregatedValuesTypes(): Promise<string[]> {
        return await this.knex
            .raw('SELECT DISTINCT "Type" FROM "AggregatedValues"')
            .then((res) => {
                return res.rows;
            });
    }

    async getAggregationTypes(dataType: string): Promise<string[]> {
        const typeString = "'" + dataType + "'";

        return await this.knex
            .raw(
                'SELECT DISTINCT "Aggregation" FROM "AggregatedValues" WHERE "Type" = ' +
                    typeString,
            )
            .then((res) => {
                return res.rows;
            });
    }

    async getAggregatedValuesTypesOfSegment(
        segment_id: number,
    ): Promise<string[]> {
        return await this.knex
            .raw(
                'SELECT DISTINCT "Type" FROM "AggregatedValues" WHERE "Segment" = ' +
                    segment_id,
            )
            .then((res) => {
                return res.rows;
            });
    }

    async getAggregationTypesOfSegment(
        dataType: string,
        segment_id: number,
    ): Promise<string[]> {
        const typeString = "'" + dataType + "'";

        return await this.knex
            .raw(
                'SELECT DISTINCT "Aggregation" FROM "AggregatedValues" WHERE "Segment" = ' +
                    segment_id +
                    ' AND "Type" = ' +
                    typeString,
            )
            .then((res) => {
                return res.rows;
            });
    }
}
