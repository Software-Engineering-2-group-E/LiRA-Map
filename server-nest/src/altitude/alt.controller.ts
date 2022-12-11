import { Controller, Get } from '@nestjs/common';
import { ValueLatLng, WaysConditions } from 'src/models';
import { AltitudeService } from './alt.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('altitude')
@ApiTags('Altitude')
export class AltitudeController {
    constructor(private readonly service: AltitudeService) {}

    @Get('/')
    getAltitudes(): Promise<WaysConditions> {
        return this.service.getAltitudesConditions();
    }

    @Get('/heat')
    getHeatAltitudes(): Promise<ValueLatLng[]> {
        console.log('here');
        return this.service.getHeatAltitudes();
    }
}
