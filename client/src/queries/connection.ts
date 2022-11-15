import { get } from "./fetch";

export const getConnection = ( callback: React.Dispatch<React.SetStateAction<boolean | null>> ) => {
    get('/connection', (connection: boolean) => {
        callback(connection)
    })
}
