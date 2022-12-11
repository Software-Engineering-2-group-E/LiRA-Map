import { Injectable } from '@nestjs/common';
import { write } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { Knex } from 'knex';
import { InjectConnection } from 'nestjs-knex';
import { Measurement } from './measurements.dto';

export class MeasurementType {
    MeasurementTypeId: string
    type: string
    Created_Date: Date
}

@Injectable()
export class MeasurementsService {
    path: string;

    /*
    constructor() {
        this.path = './src/measurements/measurements.json';
    }
    */

    
    constructor(@InjectConnection('lira-main') private readonly knex: Knex) {} // TODO: Change to use our db.

    async getMeasurementTypes(): Promise<MeasurementType[]> {
        return await this.knex
            .select('*')
            .from({ public: 'MeasurementTypes' }) // TODO: Change to  use our db table 'measurement_types'.
            .orderBy('type');
    }

    async writeFile(data: any) {
        return await writeFile(
            this.path,
            JSON.stringify(data, null, 4),
            'utf8',
        );
    }

    async getMeasurements() {
        const file = await readFile(this.path, 'utf-8');
        return JSON.parse(file);
    }

    async addMeasurement(measurement: Measurement) {
        const measurements = await this.getMeasurements();
        const updatedFile = [...measurements, measurement];
        return await this.writeFile(updatedFile);
    }

    async editMeasurement(index: number, measurement: Measurement) {
        const measurements = await this.getMeasurements();
        const updatedFile = [...measurements];
        updatedFile[index] = measurement;
        return await this.writeFile(updatedFile);
    }
}
