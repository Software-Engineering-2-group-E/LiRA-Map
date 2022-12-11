import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Measurement } from './measurements/measurements.dto';
import { LatLng, PointData } from './rides/rides.dto';

export class Signup {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
}

export class LatLon {
    @ApiProperty()
    lat: number;
    @ApiProperty()
    lon: number;
}

export type Path = PointData[];

export class Bounds {
    @ApiProperty()
    minX: number;
    @ApiProperty()
    maxX: number;
    @ApiProperty()
    minY: number;
    @ApiProperty()
    maxY: number;
}

// used for queries
export class BoundedPath {
    @ApiProperty()
    path: Path;
    @ApiPropertyOptional()
    bounds?: Bounds;
}

// This class is used as a type for server's response
// for instance, JSON files follow this format
export class JSONProps extends BoundedPath {
    @ApiProperty()
    properties: Measurement;
    @ApiPropertyOptional()
    metadata?: { [key: string]: any };
}

export type Position3D = {
    x: number;
    y: number;
    z: number;
};

export class LatLngDist extends LatLng {
    @ApiProperty()
    way_dist: number;
}

export class LatLonDist extends LatLon {
    @ApiProperty()
    way_dist: number;
}

export class ValueLatLng extends LatLng {
    @ApiProperty()
    value: number;
}

export class Condition {
    @ApiProperty()
    way_dist: number;
    @ApiProperty()
    value: number;
}

export type WayId = string;

export class WaysConditions {
    @ApiProperty()
    way_lengths: number[];
    @ApiProperty()
    way_ids: WayId[];
    @ApiProperty()
    geometry: LatLngDist[][];
    @ApiProperty()
    conditions: Condition[][];
}

export class MapBounds {
    @ApiProperty()
    minLat: number;
    @ApiProperty()
    maxLat: number;
    @ApiProperty()
    minLng: number;
    @ApiProperty()
    maxLng: number;
}
