import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { Condition, MapBounds, WaysConditions } from 'src/models';
import { RCService } from './rc.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
    BoundedWaysConditionsDTO,
    WaysConditionDTO,
    WaysConditionsDTO,
} from './rc.dto';

@Controller('conditions')
@ApiTags('Conditions')
export class RCController {
    constructor(private readonly service: RCService) {}

    @Get('ways')
    @ApiResponse({
        status: 200,
        description: 'The found record',
    })
    getWaysConditions(
        @Query() query: WaysConditionsDTO,
    ): Promise<WaysConditions> {
        const { type, zoom } = query;
        if (!type) throw new BadRequestException("Missing 'type' in params");
        if (!zoom) throw new BadRequestException("Missing 'zoom' in params");
        return this.service.getWaysConditions(type, zoom);
    }

    @Get('way')
    getWayConditions(@Query() query: WaysConditionDTO): Promise<Condition[]> {
        const { wayId, type } = query;
        if (!type) throw new BadRequestException("Missing 'type' in params");
        if (!wayId) throw new BadRequestException("Missing 'wayId' in params");
        return this.service.getWayRoadConditions(wayId, type);
    }

    @Get('/bounded/ways')
    getBoundedWaysConditions(
        @Query()
        query: BoundedWaysConditionsDTO,
    ): Promise<WaysConditions> {
        const { minLat, maxLat, minLng, maxLng, type, zoom } = query;
        if (!type) throw new BadRequestException("Missing 'type' in params");
        if (!minLat)
            throw new BadRequestException("Missing 'minLat' in params");
        if (!maxLat)
            throw new BadRequestException("Missing 'maxLat' in params");
        if (!minLng)
            throw new BadRequestException("Missing 'minLng' in params");
        if (!maxLng)
            throw new BadRequestException("Missing 'maxLng' in params");
        if (!zoom) throw new BadRequestException("Missing 'zoom' in params");
        const bounds: MapBounds = {
            minLat: parseFloat(minLat),
            maxLat: parseFloat(maxLat),
            minLng: parseFloat(minLng),
            maxLng: parseFloat(maxLng),
        };
        return this.service.getBoundedWaysConditions(bounds, type, zoom);
    }
}
