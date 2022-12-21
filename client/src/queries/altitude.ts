//@Author(s) s184230

import {  WaysConditions, ValueLatLng } from "../models/path"
import { get } from "./fetch"

export const getAltitudes = ( setAltitudes: (data: WaysConditions) => void ) => {
    get( '/altitude', setAltitudes )
}

export const getHeat = ( setHeat: (data: ValueLatLng[]) => void ) => {
    get( '/altitude/heat', setHeat )
}