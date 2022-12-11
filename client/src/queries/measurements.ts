import { ActiveMeasProperties, MeasProperties } from '../models/properties';
import { get, put } from './fetch';

export interface MeasurementType {
	MeasurementTypeId: string;
	type: string;
	Created_Date: Date;
}

export const getMeasurements = (callback: React.Dispatch<React.SetStateAction<ActiveMeasProperties[]>>) => {
	get('/measurements', (data: MeasProperties[]) => {
		callback(data.map(meas => {
			return { ...meas, isActive: true };
		}));
	});
};

export const addMeasurement = (measurement: MeasProperties) => {
	put('/measurements/add', measurement);
};

export const editMeasurement = (measurement: MeasProperties, index: number) => {
	put('/measurements/edit', { measurement, index });
};

export const getMeasurementTypes = (callback: React.Dispatch<React.SetStateAction<MeasurementType[]>>) => {
	get('/measurements/types', (data: MeasurementType[]) => {
		callback(data);
	});
};
