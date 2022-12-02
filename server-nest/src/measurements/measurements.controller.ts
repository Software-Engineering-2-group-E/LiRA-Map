import { Controller, Get, Put, Query } from '@nestjs/common';

import { MeasurementsService, MeasurementType } from './measurements.service';
import {
    Measurement,
    MeasurementDTO,
    MeasurementEditDTO,
} from './measurements.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('measurements')
@ApiTags('Measurements')
export class MeasurementsController {
    constructor(private readonly service: MeasurementsService) {}

    @Get()
    getMeasurements(): Promise<Measurement[]> {
        return this.service.getMeasurements();
    }

    @Put('/add')
    addMeasurement(@Query() query: MeasurementDTO): Promise<any> {
        const { measurement } = query;
        return this.service.addMeasurement(measurement);
    }

    @Put('/edit')
    editMeasurement(@Query() query: MeasurementEditDTO): Promise<any> {
        const { index, measurement } = query;
        return this.service.editMeasurement(index, measurement);
    }

    @Get('/types')
    getMeasurementTypes(): Promise<MeasurementType[]> {
        console.log("Hit /types endpoint")
        return this.service.getMeasurementTypes();
    }
}
