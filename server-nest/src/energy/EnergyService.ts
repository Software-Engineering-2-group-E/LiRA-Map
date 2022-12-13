import { Injectable } from '@nestjs/common';
import { InjectConnection, Knex } from 'nestjs-knex';
//import { RideMeta } from '../rides/models.rides';
import { getPreciseDistance } from 'geolib';
import {
  AccLongMessage,
  MeasEnt,
  Message,
  SpeedMessage,
  Test,
} from './EnergyInterfaces';
//import { Measurement } from '../models';
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
} from './EnergyMath';
import { GeolibInputCoordinates } from 'geolib/es/types';
import { EnergyDB, MeasurementRow } from './EnergyDB';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

interface messageObject {
  err: string | null | undefined
  data: MeasurementRow[]
}
import { assert } from 'console';

@Injectable()
export class EnergyService {
  constructor(@InjectConnection('lira-main') private readonly knex: Knex) {}

  private readonly accLongTag = 'obd.acc_long';
  private readonly spdTag = 'obd.spd_veh';
  private readonly consTag = 'obd.trac_cons';
  private readonly whlTrqTag = 'obd.whl_trq_est';
  private readonly brkTrqTag = 'obd.brk_trq_req_elec';
  private readonly accYawTag = 'obd.acc_long';
  private readonly gpsTag = 'track.pos';
  private readonly energyDB = new EnergyDB()

  private readonly measTypes = [this.accLongTag, this.spdTag, this.whlTrqTag];

  public async get(tripId: string): Promise<any> {
    // Get all measurements related to this trip id, whose tag is either obd.whl_trq_est, obd.trac_cons, obd.acc_long or obd.spd_veh.
    const relevantMeasurements: MeasEnt[] = await this.getRelevantMeasurements(
      tripId,
    );
    if (relevantMeasurements.length == 0) {
      const error = 'No relevant measurements found for that trip id!'
      console.error(`[Error] ${error}`)
      const msgObj = {
        err: error,
        data: null
      }
      
      return JSON.stringify(msgObj)
    }

    // Group them into triplings, consisting of index of a obd.trac_cons measurement, the relevant measurements found before it and their indexes,
    // and the relevant measurements found after it and their indexes.
    const assignments: Array<
      [number, Map<string, number>, Map<string, number>]
    > = await this.collectMeas(relevantMeasurements);
    
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
        dist < 2 ? distancesGPS[i - 1] : distancesGPS[i - 1] + dist;  // why 2?
    }

    // let assignmentsFiltered = [];
    const window = 10;
    const af: number[] = [0];
    distancesGPS.forEach((d, i) => {
      const prevIndex = af[af.length - 1];
      const a = Math.ceil(distancesGPS[prevIndex] / window);
      const b = Math.ceil(d / window);
      if (b - a >= 1) {
        af.push(i);
      } else {
        console.log("Did NOT happen")
      }
    });

    if (af.length == 0) {
      const error = 'Length of af is 0!'
      console.error(`[Error] ${error}`)
      const msgObj = {
        err: error,
        data: null
      }
      
      return JSON.stringify(msgObj)
    }

    // const startTime = relevantMeasurements[0].Created_Date.getTime();
    // const endTime = relevantMeasurements.at(-1).Created_Date.getTime();
    // const sumOfPeriods = endTime - startTime;
    // const sumOfPeriodsSeconds = sumOfPeriods / 1000;
    // const delta = sumOfPeriodsSeconds / assignments.length;

    var containsNaN = false
    const data = af.map((a, index) => {
      const [i, before, after] = assignments[a];
      const pwr = relevantMeasurements[i];

      // Calculate the delta time that has passed between two power measurements.
      let delta: number;
      if (index == 0) {
        delta = 0;
      } else {
        const [iPrev] = assignments[af[index - 1]]; // the previous a-value is used as index into assignments.
        const prevPwr = relevantMeasurements[iPrev];
        delta =
          (pwr.Created_Date.getTime() - prevPwr.Created_Date.getTime()) / 1000;
      }

      const pwrVal = calibratePower(pwr); // This call might return undefined, might as well skip/abort this iteration if so?
      const energyVal = (pwrVal * delta) / 3600; // What does 3600 represent? An hour (60*60) or?

      // Calculate an interpolated value for all the different measurement tags, 
      // that we will tie to the same point in time as the power measurement.
      const spdBefore = relevantMeasurements[before.get(this.spdTag)];
      const spdAfter = relevantMeasurements[after.get(this.spdTag)];
      const spd = calcSpd(spdBefore, spdAfter, pwr);

      const dist = 10;

      const accBefore = relevantMeasurements[before.get(this.accLongTag)];
      const accAfter = relevantMeasurements[after.get(this.accLongTag)];
      const acc = calcAcc(accBefore, accAfter, pwr);

      const whlTrqBefore = relevantMeasurements[before.get(this.whlTrqTag)];
      const whlTrqAfter = relevantMeasurements[after.get(this.whlTrqTag)];
      const whlTrq = calcWhlTrq(whlTrqBefore, whlTrqAfter, pwr);

      const energyWhlTrq = calcEnergyWhlTrq(whlTrq, dist);
      const energySlope = calcEnergySlope(0, 0, dist);
      const energyInertia = calcEnergyInertia(acc, dist);
      const energyAero = calcEnergyAero(spd, dist);
      const pwrNormalised =
        energyVal - energyWhlTrq - energySlope - energyInertia - energyAero;

      if (isNaN(pwrNormalised)) {
        containsNaN = true
      }

      const msg = JSON.stringify({
        result: pwrNormalised,
        prev_power: energyVal,
        whlTrq: energyWhlTrq,
        slope: energySlope,
        inertia: energyInertia,
        aero: energyAero,
      });

      var measurement : MeasurementRow = {
        MeasurementId: uuidv4(),
        TS_or_Distance: pwr.TS_or_Distance,
        Created_Date: pwr.Created_Date,
        Updated_Date: pwr.Updated_Date,
        lat: pwr.lat,
        lon: pwr.lon,
        isComputed: pwr.isComputed,
        FK_Trip: pwr.FK_Trip,
        FK_MeasurementType: pwr.FK_MeasurementType,
        T: "gre.pwr",
        message: msg
      }
      
      return measurement;
    });

    if (containsNaN) {
      //this.energyDB.persist(data)

      const msgObj = {
        err: 'Calculations contain NaN values.',
        data: data
      }

      return JSON.stringify(msgObj)
    } else {
      this.energyDB.persist(data)

      const msgObj = {
        err: null,
        data: data
      }

      return JSON.stringify(msgObj)
    }
  }

  /**
   * Returns all measurements related to the given trip id, whose "T" tag is either:
   *  - obd.whl_trq_est
   *  - obd.trac_cons
   *  - obd.acc_long
   *  - obd.spd_veh
   */
  private async getRelevantMeasurements(tripId: string) {
    return this.knex
      .select('*')
      .from({ public: 'Measurements' })
      .where('FK_Trip', tripId)
      .whereIn('T', [this.consTag].concat(this.measTypes))
      .orderBy('Created_Date')
      .limit(10000)
      .offset(1000); // FIXME: Why is this offset here? Should probably be removed.
  }

  /**
   * For every measurement with the obd.trac_cons tag relating to this trip, 
   * find the nearest obd.acc_long, obd.spd_veh, obd.whl_trq_est measurements.
   * 
   * Returns a list of triples, being 
   *  - the index of the obd.trac_cons being considered
   *  - A mapping between the relevant tags found before this one (key) and their index (value)
   *  - A mapping between the relevant tags found after this one (key) and their index (value)
   */
  private async collectMeas(sortedMeasurements: MeasEnt[]): Promise<any[]> {

    // Get index of first tag of interest. This will serve as starting point.
    const powerIndex = sortedMeasurements.findIndex((m) => m.T == this.consTag);
    if (powerIndex == -1) {
      return [];
    }

    const assigned: [number, Map<string, number>, Map<string, number>][] = [];
    let measBefore: Map<string, number>;
    let measAfter: Map<string, number>;
    for (let i = powerIndex; i < sortedMeasurements.length; i++) {
      const curMeasType: string = sortedMeasurements[i].T;
      if (curMeasType == this.consTag) {
        measBefore = this.findMeas(sortedMeasurements, i, 'before');
        measAfter = this.findMeas(sortedMeasurements, i, 'after');
        if (measBefore && measAfter) {
          assigned.push([i, measBefore, measAfter]);
        }
      }
    }

    return assigned;
  }

  /**
   * Look either forward or backward in the measurement array after measurements with tags
   * obd.acc_long, obd.spd_veh or obd.whl_trq_est, until one of each has been found. Return these.
   */
  private findMeas(
    meas: MeasEnt[],
    index: number,
    direction: 'before' | 'after',
  ) {
    let measMap: Map<string, number> = new Map<string, number>();
    let foundAll = false;

    const incWith = direction == 'after' ? 1 : -1;

    for (let i = index; !foundAll && i < meas.length && i >= 0; i += incWith) {
      const curMeas = meas[i];
      const curMeasType: string = curMeas.T;
      if (!measMap.has(curMeasType) && this.measTypes.includes(curMeasType)) {
        measMap = measMap.set(curMeasType, i);
      }
      foundAll = this.measTypes.every((key) => measMap.has(key));
    }

    // FIXME: Should be inside for-loop, to quit as soon as all tags have been found. Other for loop just runs until end of array.
    if (foundAll) {
      console.log(measMap)
      return measMap;
    }

    return null;
  }
}
