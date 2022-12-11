import { Controller, Get, Param, Inject, Query } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { ConfigService } from '@nestjs/config';
import {
    Segment,
    SegmentWithAggregatedValue,
} from './interfaces/segment.interface';
import { ApiTags } from '@nestjs/swagger';
import { SegmentIdDTO, SegmentsDTO } from './segments.dto';

@Controller('segments')
@ApiTags('Segments')
export class SegmentsController {
    @Inject(ConfigService)
    public config: ConfigService;

    constructor(private readonly segmentsService: SegmentsService) {}

    @Get('/polygon/:points')
    getSegmentsInPolygon(
        @Param() params,
        @Query()
        query: SegmentsDTO,
    ): Promise<SegmentWithAggregatedValue[]> {
        const pointsList = params.points.split(';');
        const type = query.type;
        const direction = query.direction;
        const aggregation = query.aggregation;
        return this.segmentsService.getSegmentsInPolygonWithAggregatedValues(
            pointsList,
            type,
            aggregation,
            direction,
        );
    }

    @Get(':segment_id')
    getSegmentAndValue(
        @Param() params,
        @Query() query: SegmentIdDTO,
    ): Promise<SegmentWithAggregatedValue> {
        const segment_id = params.segment_id;
        const type = query.type;
        const aggregation = query.aggregation;
        return this.segmentsService.getSegmentWithAggregatedValue(
            segment_id,
            type,
            aggregation,
        );
    }
}
