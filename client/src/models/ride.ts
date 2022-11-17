import {createModel} from "@rematch/core";
import {RootModel} from ".";
import axios from "../utils/axios";
import {AxiosResponse} from "axios";

export interface Rides {
    rides?: Ride[]
}

export interface Ride {
    TripId?: string;
    TaskId?: number;
    StartTimeUtc?: Date;
    EndTimeUtc?: Date;
    StartPositionLat?: string;
    StartPositionLng?: string;
    StartPositionDisplay?: string;
    EndPositionLat?: string;
    EndPositionLng?: string;
    EndPositionDisplay?: string;
    Duration?: Date;
    DistanceKm?: number;
    FK_Device?: string;
    Created_Date?: Date;
    Updated_Date?: Date;
    Fully_Imported?: boolean;
}

let rideState: Rides = {
     rides: [] //Initial state
};

export const rides = createModel<RootModel>()({
    state: rideState,
    reducers: {
        setState(state, payload: Rides) {
            console.log(payload)
            return state = payload;
        }
    },
    effects: (dispatch) => ({
        async fetchRides() {
            return axios.get("/rides").then((response: AxiosResponse<Rides>) => {
                dispatch.rides.setState(response.data);
            })
        }
    })
});