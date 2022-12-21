//@Author s175182, s204433

import axios, { AxiosResponse } from 'axios'

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const devURL = 'http://localhost:3002'
const prodURL = 'http://se2-e.compute.dtu.dk:3002'

const getPath = (p: string) => ( development ? devURL : prodURL ) + p

/** @deprecated use a reducer instead, look in src/models/user.ts for inspiration */
export async function asyncPost<T>(path: string, obj: object ): Promise<AxiosResponse<T, any>>
{
    return axios.get<T>( getPath(path), {
        params: obj,
        paramsSerializer: params => Object.keys(params)
            .map( (key: any) => new URLSearchParams(`${key}=${params[key]}`) )
            .join("&")
    } )
}
/** @deprecated use a reducer instead, look in src/models/user.ts for inspiration */
export function get<T>(path: string, callback: (data: T) => void): void 
{
    fetch(getPath(path))
        .then(res => res.json())
        .then(data => callback(data));
}
/** @deprecated use a reducer instead, look in src/models/user.ts for inspiration */
export function post<T>(path: string, obj: object, callback: (data: T) => void): void
{
    asyncPost<T>(path, obj).then(res => callback(res.data));
}
/** @deprecated use a reducer instead, look in src/models/user.ts for inspiration */
export function post_new(path: string, body: object): Promise<AxiosResponse> {
    return axios.post(getPath(path), body)
}
/** @deprecated use a reducer instead, look in src/models/user.ts for inspiration */
export const put = ( path: string, obj: object ): void => {
    axios.put( getPath(path), { params: obj } )
}