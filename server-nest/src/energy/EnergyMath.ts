import { MeasEnt } from './EnergyInterfaces';

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

export function getMeasVal(meas: MeasEnt): number {
  const valueTag: string = meas.T + '.value';
  const message = JSON.parse(meas.message);
  if (message.hasOwnProperty(valueTag)) {
    return message[valueTag] as number;
  }
}

export function interpMeas(time: Date, meas1: MeasEnt, meas2: MeasEnt) {
  const x0 = meas1.Created_Date.getTime();
  const y0 = getMeasVal(meas1);

  const x1 = meas2.Created_Date.getTime();
  const y1 = getMeasVal(meas2);

  return linInterp(time.getTime(), [x0, y0], [x1, y1]);
}

export function calcWhlTrq(
  whlTrqBefore: MeasEnt,
  whlTrqAfter: MeasEnt,
  curPower: MeasEnt,
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
    12800 * 0.5 -
    12700
  );
}

export function calcSpd(
  spdBefore: MeasEnt,
  spdAfter: MeasEnt,
  curPower: MeasEnt,
) {
  const dateBefore = spdBefore.Created_Date.getTime();
  const spdBeforeMPS = getMeasVal(spdBefore) / 3.6;

  const dateAfter = spdAfter.Created_Date.getTime();
  const spdAfterMPS = getMeasVal(spdAfter) / 3.6;

  return linInterp(
    curPower.Created_Date.getTime(),
    [dateBefore, spdBeforeMPS],
    [dateAfter, spdAfterMPS],
  );
}

export function calcAcc(
  accBefore: MeasEnt,
  accAfter: MeasEnt,
  curPower: MeasEnt,
) {
  const dateBefore = accBefore.Created_Date.getTime();
  const accBeforeVal = (getMeasVal(accBefore) - 2 * 198) * 0.05;

  const dateAfter = accAfter.Created_Date.getTime();
  const accAfterVal = (getMeasVal(accAfter) - 2 * 198) * 0.05;

  return linInterp(
    curPower.Created_Date.getTime(),
    [dateBefore, accBeforeVal],
    [dateAfter, accAfterVal],
  );
}

export function calibratePower(curPower: MeasEnt) {
  return (getMeasVal(curPower) - 160) * 1000;
}

const vehicleMass = 1584;

export function forceToEnergy(force: number, window: number) {
  return (1 / 3600) * force * window;
}

export function calcEnergyWhlTrq(whrTrq: number, window: number) {
  const whlRadius = 0.3;
  const force: number = whrTrq / whlRadius;
  return forceToEnergy(force, window);
}

export function calcEnergySlope(lat: number, lon: number, window: number) {
  const g = 9.80665;
  const slope = 0; // TODO Implement
  const force = vehicleMass * g * slope;
  return forceToEnergy(force, window);
}

export function calcEnergyInertia(acc: number, window: number) {
  const force = vehicleMass * acc;
  return forceToEnergy(force, window);
}

export function calcEnergyAero(spd: number, window: number) {
  const dragCoef = 0.29;
  const airDens = 1.225;
  const crossSec = 2.3316;
  const force = 0.5 * airDens * crossSec * dragCoef * (spd * spd);
  return forceToEnergy(force, window);
}
