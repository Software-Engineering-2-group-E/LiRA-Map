import { Controller, Get, Param, Query } from '@nestjs/common';
import { TypesService } from './types.service';
import { ApiTags } from '@nestjs/swagger';
import { SegmentDto, TypesDto } from './types.dto';

@Controller('types')
@ApiTags('Types')
export class TypesController {
    constructor(private readonly typesService: TypesService) {}

    @Get('aggregatedValues/types')
    getAggregatedValuesTypes(): Promise<string[]> {
        return this.typesService.getAggregatedValuesTypes();
    }

    @Get('aggregatedValues/aggregation')
    getAggregationTypes(@Query() query: TypesDto): Promise<string[]> {
        const type = query.type;
        return this.typesService.getAggregationTypes(type);
    }

    @Get('aggregatedValues/types/:segment_id')
    getAggregatedValuesTypesOfSegment(
        @Param() params: SegmentDto,
    ): Promise<string[]> {
        const segment_id = params.segment_id;
        return this.typesService.getAggregatedValuesTypesOfSegment(segment_id);
    }

    @Get('aggregatedValues/aggregation/:segment_id')
    getAggregationTypesOfSegment(
        @Param() params: SegmentDto,
        @Query() query: TypesDto,
    ): Promise<string[]> {
        const type = query.type;
        const segment_id = params.segment_id;
        return this.typesService.getAggregationTypesOfSegment(type, segment_id);
    }
}
