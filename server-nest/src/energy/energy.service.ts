//@Author s183816, s164420

import { Injectable } from '@nestjs/common';
import { InjectConnection, Knex } from 'nestjs-knex';
import { getPreciseDistance } from 'geolib';
import {
    EnergyResponse,
    MappingPowerMeasToRelevant,
    MeasurementRow,
    PowerMessage,
} from './energy.dto';
import * as Console from 'console';
import {
    calcAcc,
    calibratePower,
    calcSpd,
    calcWhlTrq,
    calcEnergyAero,
    linInterp,
    calcEnergyWhlTrq,
    calcEnergySlope,
    calcEnergyInertia,
    getMeasVal,
} from './energy.math';
import { EnergyDB } from './energy.db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EnergyService {
    constructor(
        @InjectConnection('our-lira-db') private readonly ourDb: Knex,
        @InjectConnection('lira-main') private readonly knex: Knex,
    ) {}

    private readonly accLongTag = 'obd.acc_long';
    private readonly spdTag = 'obd.spd_veh';
    private readonly consTag = 'obd.trac_cons';
    private readonly whlTrqTag = 'obd.whl_trq_est';
    private readonly energyDB = new EnergyDB();

    private readonly measTypes = [this.accLongTag, this.spdTag, this.whlTrqTag];

    public async getEnergy(tripId: string): Promise<string> {
        // Get calculations for that trip id if they already exists
        const [exists, result] = await this.getIfExists(tripId);
        if (exists) {
            const msgObj: EnergyResponse = {
                status: 'success',
                data: result,
            };

            return JSON.stringify(msgObj);
        } else {
            return await this.calculateEnergy(tripId);
        }
    }

    public async calculateEnergy(tripId: string): Promise<string> {
        // Get all measurements related to this trip id, whose tag is either obd.whl_trq_est, obd.trac_cons, obd.acc_long or obd.spd_veh.
        const relevantMeasurements: MeasurementRow[] =
            await this.getRelevantMeasurements(tripId);
        if (relevantMeasurements.length == 0) {
            const error = 'No relevant measurements found for that trip id!';
            console.error(`[Error] ${error}`);
            const msgObj: EnergyResponse = {
                status: 'fail',
                data: { tripId: error },
            };

            return JSON.stringify(msgObj);
        }

        // Group them into triplings, consisting of index of a obd.trac_cons measurement, the relevant measurements found before it and their indexes,
        // and the relevant measurements found after it and their indexes.
        const assignments: MappingPowerMeasToRelevant =
            await this.anchorMeasAroundPowerMeas(relevantMeasurements);

        // Calculate accumulated distance between start point and all other measurements,
        // using the geolib library to convert from latitude/longitude to distance.
        const distancesGPS = new Array<number>(assignments.length);
        distancesGPS[0] = 0;
        for (let i = 1; i < assignments.length; i++) {
            const [curMeasIndex] = assignments[i];
            const curPower = relevantMeasurements[curMeasIndex];
            const [prevMeasIndex] = assignments[i - 1];
            const prevPower = relevantMeasurements[prevMeasIndex];
            const dist = getPreciseDistance(
                { latitude: curPower.lat, longitude: curPower.lon },
                { latitude: prevPower.lat, longitude: prevPower.lon },
                0.5,
            );
            distancesGPS[i] =
                dist < 2 ? distancesGPS[i - 1] : distancesGPS[i - 1] + dist; // filter away distances less than two, to get rid of GPS noise. TODO: Get rid of magic number.
        }

        // Force to energy, work over distance. Asmus does it in a slightly different way. Maybe we should refactor this.
        // Using 10m windows, only jotting down a measurement if it has passed the 10m threshold.
        const window = 10;
        const af: number[] = [0];
        distancesGPS.forEach((d, i) => {
            const prevIndex = af[af.length - 1];
            const a = Math.ceil(distancesGPS[prevIndex] / window);
            const b = Math.ceil(d / window);
            if (b - a >= 1) {
                af.push(i);
            }
        });

        if (af.length == 0) {
            const error = 'Length of af is 0!';
            console.error(`[Error] ${error}`);
            const msgObj: EnergyResponse = {
                status: 'error',
                message: error,
            };

            return JSON.stringify(msgObj);
        }

        // const startTime = relevantMeasurements[0].Created_Date.getTime();
        // const endTime = relevantMeasurements.at(-1).Created_Date.getTime();
        // const sumOfPeriods = endTime - startTime;
        // const sumOfPeriodsSeconds = sumOfPeriods / 1000;
        // const delta = sumOfPeriodsSeconds / assignments.length;

        let containsNaN = false;
        const data = af.map((a, index) => {
            const [i, before, after] = assignments[a];
            const pwr = relevantMeasurements[i];

            let delta: number;
            if (index == 0) {
                delta = 0;
            } else {
                const [iPrev] = assignments[af[index - 1]];
                const prevPwr = relevantMeasurements[iPrev];
                delta =
                    (pwr.Created_Date.getTime() -
                        prevPwr.Created_Date.getTime()) /
                    1000;
            }

            const pwrVal = calibratePower(pwr);
            const energyVal = (pwrVal * delta) / 3600;

            const spdBefore = relevantMeasurements[before.get(this.spdTag)];
            const spdAfter = relevantMeasurements[after.get(this.spdTag)];
            const spd = calcSpd(spdBefore, spdAfter, pwr);

            const dist = 10;

            const accBefore = relevantMeasurements[before.get(this.accLongTag)];
            const accAfter = relevantMeasurements[after.get(this.accLongTag)];
            const acc = calcAcc(accBefore, accAfter, pwr);

            const whlTrqBefore =
                relevantMeasurements[before.get(this.whlTrqTag)];
            const whlTrqAfter = relevantMeasurements[after.get(this.whlTrqTag)];
            const whlTrq = calcWhlTrq(whlTrqBefore, whlTrqAfter, pwr);

            const energyWhlTrq = calcEnergyWhlTrq(whlTrq, dist);
            const energySlope = calcEnergySlope(0, 0, dist);
            const energyInertia = calcEnergyInertia(acc, dist);
            const energyAero = calcEnergyAero(spd, dist);
            const pwrNormalised =
                energyVal -
                energyWhlTrq -
                energySlope -
                energyInertia -
                energyAero;

            if (isNaN(pwrNormalised)) {
                containsNaN = true;
            }

            const msg: PowerMessage = {
                'gre.pwr.value': pwrNormalised,
                'gre.pwr.total': energyVal,
                'gre.pwr.whl_trq': energyWhlTrq,
                'gre.pwr.slope': energySlope,
                'gre.pwr.inertia': energyInertia,
                'gre.pwr.aero': energyAero,
            };

            const measurement: MeasurementRow = {
                MeasurementId: uuidv4(),
                TS_or_Distance: pwr.TS_or_Distance,
                Created_Date: pwr.Created_Date,
                Updated_Date: pwr.Updated_Date,
                lat: pwr.lat,
                lon: pwr.lon,
                isComputed: pwr.isComputed,
                FK_Trip: pwr.FK_Trip,
                FK_MeasurementType: pwr.FK_MeasurementType,
                T: 'gre.pwr',
                message: JSON.stringify(msg),
            };

            return measurement;
        });

        if (containsNaN) {
            const msgObj: EnergyResponse = {
                status: 'error',
                message: 'Calculations contain NaN values.',
            };
            return JSON.stringify(msgObj);
        } else {
            this.energyDB.persist(data);

            const msgObj: EnergyResponse = {
                status: 'success',
                data: data,
            };

            return JSON.stringify(msgObj);
        }
    }

    async getIfExists(tripId: string) {
        const result = await this.ourDb
            .select('*')
            .from('Measurements')
            .where('FK_Trip', `${tripId}`);
        const exists = result.length > 0 ? true : false;

        return [exists, result] as const;
    }

    private async getRelevantMeasurements(tripId: string) {
        return this.knex
            .select('*')
            .from({ public: 'Measurements' })
            .where('FK_Trip', tripId)
            .whereIn('T', [this.consTag].concat(this.measTypes))
            .orderBy('Created_Date');
    }

    private async anchorMeasAroundPowerMeas(
        sortedMeasurements: MeasurementRow[],
    ): Promise<MappingPowerMeasToRelevant> {
        const powerIndex = sortedMeasurements.findIndex(
            (m) => m.T == this.consTag,
        );
        if (powerIndex == -1) {
            return [];
        }

        const assigned: MappingPowerMeasToRelevant = [];
        let measBefore: Map<string, number>;
        let measAfter: Map<string, number>;
        for (let i = powerIndex; i < sortedMeasurements.length; i++) {
            const curMeasType: string = sortedMeasurements[i].T;
            if (curMeasType == this.consTag) {
                measBefore = this.findMeasInDirection(
                    sortedMeasurements,
                    i,
                    'before',
                );
                measAfter = this.findMeasInDirection(
                    sortedMeasurements,
                    i,
                    'after',
                );
                if (measBefore && measAfter) {
                    assigned.push([i, measBefore, measAfter]);
                }
            }
        }

        return assigned;
    }

    private findMeasInDirection(
        meas: MeasurementRow[],
        index: number,
        direction: 'before' | 'after',
    ) {
        let measMap: Map<string, number> = new Map<string, number>();
        let foundAll = false;

        const incWith = direction == 'after' ? 1 : -1;

        for (
            let i = index;
            !foundAll && i < meas.length && i >= 0;
            i += incWith
        ) {
            const curMeas = meas[i];
            const curMeasType: string = curMeas.T;
            if (
                !measMap.has(curMeasType) &&
                this.measTypes.includes(curMeasType)
            ) {
                measMap = measMap.set(curMeasType, i);
            }

            // Return early if all are found
            foundAll = this.measTypes.every((key) => measMap.has(key));
            if (foundAll) {
                return measMap;
            }
        }

        return null;
    }
}
