export interface MeasurementEntity {
  MeasurementId: string;
  TS_or_Distance: string;
  T: string;
  lat: number;
  lon: number;
  message: Message;
  isComputed: boolean;
  FK_Trip: string;
  FK_MeasurementType: string;
  Created_Date: Date;
  Updated_Date: Date;
}

export interface Message {
  id: string;
  start_time_utc: string;
  end_time_utc: string;
  '@vid': number;
  '@uid': string;
  '@ts': string;
  '@t': string;
  '@rec': string;
}

export interface AccelerationMessage extends Message {
  'acc.xyz.z'?: number;
  'acc.xyz.y'?: number;
  'acc.xyz.x'?: number;
}

export interface SpeedMessage extends Message {
  'obd.spd_veh.value'?: number;
}

export interface TractionConsumptionMessage extends Message {
  'obd.trac_cons.value'?: number;
}

export interface Test {
  key: string;
  value: number;
  timestamp: string;
}