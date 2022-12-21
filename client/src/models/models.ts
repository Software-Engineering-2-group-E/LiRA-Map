//@Author(s) s175182

export interface RideMeta {
	TripId: string,
	TaskId: number, 
	StartTimeUtc: string,	// "2021-04-27T18:11:02.223Z"
	EndTimeUtc: string, //	"2021-04-27T18:57:18.551Z"
	StartPositionLat: string, //	"55.683240"
	StartPositionLng: string, //	"12.584890"
	StartPositionDisplay: string, //	"{\"ntk_geocode_time\":48…2,\"type\":\"geocode\"}"
	EndPositionLat: string, //	"55.711580"
	EndPositionLng: string, //		"12.570990"
	EndPositionDisplay: string, //		"{\"ntk_geocode_time\":31…"house_number\":\"37\"}"
	Duration: string, //		"2021-07-30T00:46:16.327Z"
	DistanceKm: number, //		86.0269352289332
	FK_Device: string, //	"d25574dd-e9a4-4296-ae00-7dcef3aa8278"
	Created_Date: string, //		"2021-07-30T07:52:47.969Z"
	Updated_Date: string, //		"0001-01-01T00:00:00.000Z"
}

// export interface MeasurementData {
// 	T: string,
// 	lat: number,
// 	lon: number,
// 	message: string
// }

export interface LatLng {
	lat: number;
	lng: number;
}

export interface TripsOptions {
    search: string;
    startDate: Date;
    endDate: Date;
    reversed: boolean;
}




