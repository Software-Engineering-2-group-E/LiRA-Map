import { FC, useState } from "react";
import { TwitterPicker } from "react-color";
import { Gradient } from "react-gradient-hook";

import { RendererName, rendererTypes } from "../../../models/renderers";

import Checkbox from "../../Checkbox";
import { ActiveMeasProperties } from "../../../models/properties";


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

    return (
        <div className="popup-wrapper">    
            <input className="sweetalert-input" placeholder="Name.." type='text' defaultValue={name} onChange={inputChange('name')}/>
            
            <input className="sweetalert-input" placeholder="Tag.." type='text' defaultValue={dbName} onChange={inputChange('dbName')}/>
            
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