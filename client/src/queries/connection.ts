//@Author(s) s164420

import { get } from "./fetch";

export const getConnection = ( callback: React.Dispatch<React.SetStateAction<boolean | null>> ) => {
    get('/connection', (connection: boolean) => {
        // console.log("Connection:\n");
        // console.log(connection);
        callback(connection)
    })
}
