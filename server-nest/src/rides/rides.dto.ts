import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PointProperties } from '../measurements/measurements.dto';

export class RideMeta {
    TripId: string;
    TaskId: number;
    StartTimeUtc: string; // "2021-04-27T18:11:02.223Z"
    EndTimeUtc: string; // 	"2021-04-27T18:57:18.551Z"
    StartPositionLat: string; // 	"55.683240"
    StartPositionLng: string; // 	"12.584890"
    StartPositionDisplay: string; // 	"{\"ntk_geocode_time\":48…2,\"type\":\"geocode\"}"
    EndPositionLat: string; // 	"55.711580"
    EndPositionLng: string; // 		"12.570990"
    EndPositionDisplay: string; // 		"{\"ntk_geocode_time\":31…"house_number\":\"37\"}"
    Duration: string; // 		"2021-07-30T00:46:16.327Z"
    DistanceKm: number; // 		86.0269352289332
    FK_Device: string; // 	"d25574dd-e9a4-4296-ae00-7dcef3aa8278"
    Created_Date: string; // 		"2021-07-30T07:52:47.969Z"
    Updated_Date: string; // 		"0001-01-01T00:00:00.000Z"
}

export class LatLng {
    @ApiProperty()
    lat: number;
    @ApiProperty()
    lng: number;
}

export class PointData extends LatLng {
    @ApiPropertyOptional()
    properties?: PointProperties;
    @ApiPropertyOptional()
    value?: number;
    @ApiPropertyOptional()
    metadata?: any;
}

export class GetRideDTO {
    tripId: string;
    dbName: string;
}
