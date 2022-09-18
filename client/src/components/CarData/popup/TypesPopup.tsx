


import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import { SegTypes } from "../../../pages/CarData";
import Checkboxes from "../Checkboxes";

import { GetAggregationTypes, GetDataTypes } from "../../../queries/DataRequests";


interface IPopupWrapper {
    types: SegTypes;
    setTypes: Dispatch<SetStateAction<SegTypes>>;
}

const TypesPopup: FC<IPopupWrapper> = ( { types, setTypes } ) => {
    
    const [dataTypes, setDataTypes] = useState<string[]>([]);
    const [aggrTypes, setAggrTypes] = useState<string[]>([]);

    const { dataType, aggrType } = types;
    var direction = -1;
    const fetchAggrTypes = (dt: string) => GetAggregationTypes(dt).then( (at) => {
        console.log(dt, at);
        setAggrTypes(at); 
    })
        
    useEffect( () => {
        GetDataTypes().then( setDataTypes )
    }, [] );

    useEffect( () => {
        if ( dataType !== undefined )
            fetchAggrTypes(dataType)
    }, [dataType])

    const dataTypeOnClick = (dataType: string) => () => {
        setTypes( { dataType, aggrType: undefined, direction: direction } )
    }

    const aggregationTypeOnClick = (aggrType: string) => () => {
        setTypes( { dataType, aggrType, direction} )
    }

    return (
        <div className="seg-popup-container">    
            <Checkboxes typeName='Data type' types={dataTypes} type={dataType} onClick={dataTypeOnClick}/>
            { dataType !== undefined
                ? <Checkboxes typeName='Aggr type' types={aggrTypes} type={aggrType} onClick={aggregationTypeOnClick}/>
                : null
            }
        </div>
    )
}

export default TypesPopup