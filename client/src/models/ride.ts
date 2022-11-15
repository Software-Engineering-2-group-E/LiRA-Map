import { createModel } from "@rematch/core";
import { RootModel } from ".";
import axios from "../utils/axios";

export interface Rides {
    rides?: Ride[];
}

export interface Ride {
    TripId?: string,
    TaskId?: number,
    StartTimeUtc?: Date,
    EndTimeUtc?: Date,
    StartPositionLat?: number,
    StartPositionLng?: number,
    StartPositionDisplay?: string,
    EndPositionLat?: number,
    EndPositionLng?: number,
    EndPositionDisplay?: string,
    Duration?: Date,
    DistanceKm?: number,
    FK_Device?: string,
    Created_Date?: Date,
    Updated_Date?: Date,
    Fully_Imported?: boolean
}

let rideState: Rides = {
    rides: []
};

export const rides = createModel<RootModel>() ({
    state: rideState,
        reducers: {
        setState(state, payload: Rides) {
            return state = payload;
        }
    },
    effects: (dispatch) => ({
        async fetchRides() {
            return axios.get("/rides").then((response) => {
                dispatch.rides.setState(response.data);
            })
        }
    })
});