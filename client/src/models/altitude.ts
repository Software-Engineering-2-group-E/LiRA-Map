import { createModel } from "@rematch/core";
import { RootModel } from "./index";
import axios from "../utils/axios";
import { WaysConditions } from "./path";

export interface Altitude {
  altitudes: WaysConditions;
}

let altitudeState: Altitude = {
  altitudes: {
    way_lengths: [],
    way_ids: [],
    geometry: [],
    conditions: [],
  },
};

export const altitude = createModel<RootModel>()({
  state: altitudeState, // initial state
  reducers: {
    // handle state changes with pure functions
    setAltitudes(state, payload: WaysConditions) {
      state.altitudes = payload;
      return state;
    },
  },
  effects: (dispatch) => ({
    async getAltitudes() {
      return axios.get("/altitude").then((response) => {
        dispatch.altitude.setAltitudes(response.data);
      });
    },
  }),
});
