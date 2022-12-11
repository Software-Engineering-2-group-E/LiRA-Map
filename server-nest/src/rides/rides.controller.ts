import { Controller, Get, Query } from '@nestjs/common';
import { RidesService } from './rides.service';

import { GetRideDTO, RideMeta } from './rides.dto';
import { BoundedPath } from 'src/models';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('rides')
@ApiTags('Rides')
export class RidesController {
    constructor(private readonly service: RidesService) {}

    @Get()
    @ApiResponse({
        status: 200,
        description: 'The found record',
    })
    getRides(): Promise<RideMeta[]> {
        return this.service.getRides();
    }

    @Get('/ride')
    getRide(@Query() query: GetRideDTO): Promise<BoundedPath> {
        const { tripId, dbName } = query;
        return this.service.getRide(tripId, dbName);
    }
}
