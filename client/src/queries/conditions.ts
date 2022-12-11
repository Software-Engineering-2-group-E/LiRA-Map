import { MapBounds } from "../models/map";
import { Condition, WaysConditions } from "../models/path";
import axios, { AxiosResponse } from "axios";

const URL = "http://lirase2.compute.dtu.dk:3002";

/** @deprecated */
function post<T>(path: string, obj: object, callback: (data: T) => void): void {
  asyncPost<T>(path, obj).then((res) => callback(res.data));
}

/** @deprecated */
async function asyncPost<T>(
  path: string,
  obj: object
): Promise<AxiosResponse<T, any>> {
  return axios.get<T>(URL + path, {
    params: obj,
    paramsSerializer: (params) =>
      Object.keys(params)
        .map((key: any) => new URLSearchParams(`${key}=${params[key]}`))
        .join("&"),
  });
}

export const getWaysConditions = (
  type: string,
  zoom: number,
  setWays: (data: WaysConditions) => void
) => {
  post("/conditions/ways", { type, zoom }, setWays);
};

export const getConditions = (
  wayId: string,
  type: string,
  setConditions: (data: Condition[]) => void
) => {
  post("/conditions/way", { wayId, type }, setConditions);
};

export const getBoundedWaysConditions = async (
  bounds: MapBounds,
  type: string,
  zoom: number
) => {
  // console.log(bounds);
  return await asyncPost<WaysConditions>("/conditions/bounded/ways", {
    ...bounds,
    type,
    zoom,
  });
};
