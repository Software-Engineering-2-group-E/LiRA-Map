import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

import { SegTypes } from "../../pages/CarData";
import useSegPopup from "./SegPopup";



export interface IFilter {
    setTypes: Dispatch<SetStateAction<SegTypes>>;
}

const Filter: FC<IFilter> = ( { setTypes } ) => {

    // const popup = useSegPopup({
    //     dataType: undefined,
    //     aggrType: undefined,
    //     direction : undefined
    // })

    // const firePopup = () => popup.fire( (types: SegTypes) => {
    //     console.log(types);
    //     setTypes(types)
    // } )

    // return <FaFilter onClick={firePopup} className="toolbar-button" />

    return null;

}


export default Filter;