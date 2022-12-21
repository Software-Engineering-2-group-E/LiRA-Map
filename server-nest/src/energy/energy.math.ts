//@Author s183816

import { MeasurementRow } from './energy.dto';

// https://en.wikipedia.org/wiki/Linear_interpolation#Linear_interpolation_between_two_known_points
export function linInterp(
  x: number,
  [x0, y0]: [number, number],
  [x1, y1]: [number, number],
): number {
  if (x0 < x1) return (y0 * (x1 - x) + y1 * (x - x0)) / (x1 - x0);
  if (x0 > x1) return (y1 * (x0 - x) + y0 * (x - x1)) / (x0 - x1);
  return (y0 + y1) / 2;
}

/**
 * 
 * @param meas A measurement record from the database
 * @returns The value for the property indicated by the measurements tag, if it is found in the message. Otherwise, undefined.
 */
export function getMeasVal(meas: MeasurementRow): number {
  const valueTag: string = meas.T + '.value';
  const message = JSON.parse(meas.message);
  if (message.hasOwnProperty(valueTag)) {
    return message[valueTag] as number;
  }
}

export function interpMeas(time: Date, meas1: MeasurementRow, meas2: MeasurementRow) {
  const x0 = meas1.Created_Date.getTime();
  const y0 = getMeasVal(meas1);

  const x1 = meas2.Created_Date.getTime();
  const y1 = getMeasVal(meas2);

  return linInterp(time.getTime(), [x0, y0], [x1, y1]);
}

export function calcWhlTrq(
  whlTrqBefore: MeasurementRow,
  whlTrqAfter: MeasurementRow,
  curPower: MeasurementRow,
) {
  const dateBefore = whlTrqBefore.Created_Date.getTime();
  const whlTrqBeforeVal = getMeasVal(whlTrqBefore);

  const dateAfter = whlTrqBefore.Created_Date.getTime();
  const whlTrqAfterVal = getMeasVal(whlTrqAfter);

  return (
    linInterp(
      curPower.Created_Date.getTime(),
      [dateBefore, whlTrqBeforeVal],
      [dateAfter, whlTrqAfterVal],
    ) -
    12800 * 0.5 - 12700   // some conversion from Asmus' notes used here
  );
}

export function calcSpd(
  spdBefore: MeasurementRow,
  spdAfter: MeasurementRow,
  curPower: MeasurementRow,
) {
  const dateBefore = spdBefore.Created_Date.getTime();
  const spdBeforeMPS = getMeasVal(spdBefore) / 3.6; // Divide by 3.6 to go from km/h to m/s.

  const dateAfter = spdAfter.Created_Date.getTime();
  const spdAfterMPS = getMeasVal(spdAfter) / 3.6; // Divide by 3.6 to go from km/h to m/s.

  return linInterp(
    curPower.Created_Date.getTime(),
    [dateBefore, spdBeforeMPS],
    [dateAfter, spdAfterMPS],
  );
}

export function calcAcc(
  accBefore: MeasurementRow,
  accAfter: MeasurementRow,
  curPower: MeasurementRow,
) {
  const dateBefore = accBefore.Created_Date.getTime();
  const accBeforeVal = (getMeasVal(accBefore) - 2 * 198) * 0.05;  // some conversion from Asmus' notes used here, but why times 2?

  const dateAfter = accAfter.Created_Date.getTime();
  const accAfterVal = (getMeasVal(accAfter) - 2 * 198) * 0.05;    // some conversion from Asmus' notes used here, but why times 2?

  return linInterp(
    curPower.Created_Date.getTime(),
    [dateBefore, accBeforeVal],
    [dateAfter, accAfterVal],
  );
}

/**
 * 
 * The number 160 comes from Sergei's Thesis, Listing 5.1, in the calculate_value method - to correct for erroneous measurement.
 * Times 1000 is to convert to Watt.
 */
export function calibratePower(curPower: MeasurementRow) {
  return (getMeasVal(curPower) - 160) * 1000;
}

const vehicleMass = 1584;

/**
 * E<force>
 */
export function forceToEnergy(force: number, window: number) {
  return (1 / 3600) * force * window;
}

/**
 * Measured energy from wheel torque:
 * Fwhl = obd.whl_trq_est / wheel_radius   traction force at wheel (wheel radius is app. 0.3 meters)
 * Emeas	= 1/3600 * Fwhl * window_length   (forceToEnergy)
*/
export function calcEnergyWhlTrq(whrTrq: number, window: number) {
  const whlRadius = 0.3;
  const force: number = whrTrq / whlRadius;
  return forceToEnergy(force, window);
}

/**
 * Slope component
 * Fslope = vehicle_mass * gw * slope          where gw = 9.80665 m/s2 is the gravitational acceleration
 * Eslope = 1/3600 * Fslope * window_length    (forceToEnergy)
 */
export function calcEnergySlope(lat: number, lon: number, window: number) {
  const g = 9.80665;
  const slope = 0; // TODO Implement
  const force = vehicleMass * g * slope;
  return forceToEnergy(force, window);
}

/**
 * Inertia component
 * Facc = vehicle_mass * obd.acc_long
 * Eacc = 1/3600 * Facc * window_length        (forceToEnergy)
 */
export function calcEnergyInertia(acc: number, window: number) {
  const force = vehicleMass * acc;
  return forceToEnergy(force, window);
}


/**
 * Aerodynamic component
 * Faero = 0.5 * rho * A * cd * obd.spd_veh^2
 * Eaero = 1/3600 * Fa * window_length         (forceToEnergy)

 * cd = 0.29           air drag coefficient
 * rho = 1.225 kg/m3   the density of the air
 * A = 2.3316 m2       cross-sectional area of the car
 */
export function calcEnergyAero(spd: number, window: number) {
  const dragCoef = 0.29;
  const airDens = 1.225;
  const crossSec = 2.3316;
  const force = 0.5 * airDens * crossSec * dragCoef * (spd * spd);
  return forceToEnergy(force, window);
}
