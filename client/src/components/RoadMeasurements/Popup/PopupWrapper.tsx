import { FC, useEffect, useState } from "react";
import { TwitterPicker } from "react-color";
import { Gradient } from "react-gradient-hook";

import { RendererName, rendererTypes } from "../../../models/renderers";

import Checkbox from "../../Checkbox";
import { ActiveMeasProperties } from "../../../models/properties";
import { getMeasurementTypes, MeasurementType } from "../../../queries/measurements";


interface IPopupWrapper {
    defaultOptions: Required<ActiveMeasProperties>;
    setOptions: (newOpts: Required<ActiveMeasProperties>) => void;
}

const PopupWrapper: FC<IPopupWrapper> = ( { defaultOptions, setOptions } ) => {

    const [state, setState] = useState(defaultOptions);

    const { name, dbName, rendererName, color } = state;

    const update = (key: keyof ActiveMeasProperties) => (val: any) => {
        const temp = { ...state } as any;
        temp[key] = val;
        setState(temp)
        setOptions(temp)
    }

    const inputChange = (key: keyof ActiveMeasProperties) => ({target}: any) => update(key)(target.value)

    const [ getMeasTypes, setMeasTypes ] = useState<MeasurementType[]>([])

    useEffect( () => {
		//getMeasurements(setMeasurements)
		console.log("Getting measurement types from measurements/types")
		getMeasurementTypes(setMeasTypes)
	}, [] )

	useEffect( () => {
		console.log("Measurement types found in db:")
		console.log( getMeasTypes )
	}, [ getMeasTypes ])

    return (
        <div className="popup-wrapper">    
            <input className="sweetalert-input" placeholder="Name.." type='text' defaultValue={name} onChange={inputChange('name')}/>
            
            <select name="tags" id="tags">
            <option value="" disabled selected>Tag..</option>
            {getMeasTypes.map((value, index) => {
                return ( <option value={value.type}>{value.type}</option> ) 
                            })
            }
            </select>

            <div className="sweetalert-checkboxes">
                { Object.keys(RendererName).map( (rName: string, i: number) => 
                    <Checkbox 
                        key={`sweetalert-checkbox-${i}`}
                        className='ride-metadata-checkbox'
                        html={<div style={{textTransform: "capitalize"}}>{rName}</div>}
                        forceState={rName === rendererName}
                        onClick={() => update('rendererName')(rName)} />
                ) }
            </div>

            { rendererTypes[rendererName].usePalette 
                ? <Gradient
                    key={`gradient-${rendererName}`}
                    defaultColors={rendererTypes[rendererName].defaultPalette} 
                    cursorOptions={{grid: true, samples: 40}} 
                    pickerOptions={{showCircles: false}}
                    onChange={update('palette')} />
                : <TwitterPicker color={color} onChange={c => update('color')(c.hex)} />
            }
        </div>
    )
}

export default PopupWrapper;