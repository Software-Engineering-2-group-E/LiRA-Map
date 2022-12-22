//@Author s183816

import { IJSendResponse } from 'src/app.dto';

export class MeasurementRow {
    MeasurementId: string;
    TS_or_Distance: string;
    T: string;
    lat: number;
    lon: number;
    message: string;
    isComputed: boolean;
    FK_Trip: string;
    FK_MeasurementType: string;
    Created_Date: Date;
    Updated_Date: Date;
}

export class EnergyResponse extends IJSendResponse {}

export class PowerMessage {
    'gre.pwr.value': number;
    'gre.pwr.total': number;
    'gre.pwr.whl_trq': number;
    'gre.pwr.slope': number;
    'gre.pwr.inertia': number;
    'gre.pwr.aero': number;
}

export type MappingPowerMeasToRelevant = Array<
    [number, Map<string, number>, Map<string, number>]
>;
