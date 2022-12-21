//@Author s183816, s164420

import { Dispatch, SetStateAction } from "react"
import { RideMeta } from "../models/models"
import { BoundedPath, Metadata } from "../models/path"
import { PopupFunc } from "../models/popup"
import { ActiveMeasProperties } from "../models/properties"
import { asyncPost, get, post } from "./fetch"


export const getRides = ( callback: Dispatch<SetStateAction<RideMeta[]>> ) => {
    get( '/rides', callback )
    // Must use ProdURL to not crash
}


export const getRide = async (
    measurement: ActiveMeasProperties, 
    meta: Metadata, 
    popup: PopupFunc,
) => {
    const { dbName, name, hasValue } = measurement
    const { TripId: tripId, TaskId: taskId } = meta;

    // console.log('Querying measurement: ', name, '\nTaskId: ', taskId );
    
    const { data } = await asyncPost<BoundedPath[]>( '/rides/ride', { tripId, dbName } )

    if (!data.length || data[0].path.length === 0) {
        popup( {
            icon: "warning",
            title: `This trip doesn't contain data for ${name}`,
            footer: `TripId: ${tripId} | TaskId: ${taskId}`,
            toast: true
        } );

        return undefined;
    }
                
    return data;
}