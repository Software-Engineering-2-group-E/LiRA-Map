import { FC, useState } from "react";
import DatePicker from "react-date-picker";
import { TripsOptions } from "../../models/models";
import Checkbox from "../Checkbox";

const defaultOptions: TripsOptions = {
    search: '',
    startDate: new Date("2020-01-01"),
    endDate: new Date(),
    reversed: false
} 

interface IOptionsSelector {
    onChange: ( options: TripsOptions ) => void;
}

const OptionsSelector: FC<IOptionsSelector> = ( { onChange } ) => {

    const [options, setOptions] = useState<TripsOptions>(defaultOptions)

    const _onChange = (key: keyof TripsOptions) => {
        return function<T>(value: T) 
        {
            const temp = { ...options } as any
            temp[key] = value;
            setOptions(temp)
            onChange(temp)
        }
    } 

    return (
        <div className="rides-options">
            <input 
                className="ride-search-input" 
                placeholder='Search..' 
                value={options.search} 
                onChange={e => _onChange('search')(e.target.value)} />

            <DatePicker onChange={_onChange('startDate')} value={options.startDate} className="options-date-picker" />
            <DatePicker onChange={_onChange('endDate')} value={options.endDate} className="options-date-picker" />

            <Checkbox
                className="ride-sort-cb"
                html={<div>Sort {options.reversed ? '▼' : '▲'}</div>}
                onClick={_onChange('reversed')} />
        </div>
        
    )
}

export default OptionsSelector;