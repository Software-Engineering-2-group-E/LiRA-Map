//@Author(s) s184230

import jwtDecode from 'jwt-decode';

export const isValidToken = (accessToken: string | undefined) => {
    if (accessToken === undefined || !accessToken) {
        return false;
    }

    const decoded = jwtDecode<{ exp: number }>(accessToken);
    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};