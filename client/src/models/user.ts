//@Author(s) s175182, s184230

import { createModel } from "@rematch/core";
import { RootModel } from ".";
import axios from "../utils/axios";

export interface Access {
    userCredentials?: UserCredentials;
    userData?:        UserData;
}

export interface UserCredentials {
    user?:           User;
    providerId?:     null;
    _tokenResponse?: TokenResponse;
    operationType?:  string;
}

export interface TokenResponse {
    kind?:         string;
    localId?:      string;
    email?:        string;
    displayName?:  string;
    idToken?:      string;
    registered?:   boolean;
    refreshToken?: string;
    expiresIn?:    string;
}

export interface User {
    uid?:             string;
    email?:           string;
    emailVerified?:   boolean;
    isAnonymous?:     boolean;
    providerData?:    ProviderDatum[];
    stsTokenManager?: StsTokenManager;
    createdAt?:       string;
    lastLoginAt?:     string;
    apiKey?:          string;
    appName?:         string;
}

export interface ProviderDatum {
    providerId?:  string;
    uid?:         string;
    displayName?: null;
    email?:       string;
    phoneNumber?: null;
    photoURL?:    null;
}

export interface StsTokenManager {
    refreshToken?:   string;
    accessToken?:    string;
    expirationTime?: number;
}

export interface UserData {
    lastName?:  string;
    firstName?: string;
}

let accessState: Access = {
    userCredentials: {},
    userData:        {}
};
export const access = createModel<RootModel>()({
    state: accessState, // initial state
    reducers: {
        // handle state changes with pure functions
        setState(state, payload: Access) {
            return state = payload;
        },
        logout(state) {
            return state = {}
        }
    },
    effects: (dispatch) => ({
        async login(payload: { email: string, password: string }) {
            return axios.post('/login', payload).then((response) => {
                dispatch.access.setState(response.data);
            })
        },
    }),
});