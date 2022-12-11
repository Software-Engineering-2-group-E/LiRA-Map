import { ApiProperty } from '@nestjs/swagger';
import { Condition, LatLonDist } from '../models';

export class BoundedCondition {
    @ApiProperty()
    conditions: { [condition_type: string]: Condition[] };
    @ApiProperty()
    length: number;
    @ApiProperty()
    coordinates: LatLonDist[];
}

export class WaysConditionsDTO {
    @ApiProperty()
    type: string;
    @ApiProperty()
    zoom: string;
}

export class WaysConditionDTO {
    @ApiProperty()
    wayId: string;
    @ApiProperty()
    type: string;
}

export class BoundedWaysConditionsDTO {
    @ApiProperty()
    minLat: string;
    @ApiProperty()
    maxLat: string;
    @ApiProperty()
    minLng: string;
    @ApiProperty()
    maxLng: string;
    @ApiProperty()
    type: string;
    @ApiProperty()
    zoom: string;
}
