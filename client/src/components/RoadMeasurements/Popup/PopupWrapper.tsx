import { FC, useEffect, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { Gradient } from 'react-gradient-hook';

import { RendererName, rendererTypes } from '../../../models/renderers';

import Checkbox from '../../Checkbox';
import { ActiveMeasProperties } from '../../../models/properties';
import { getMeasurementTypes, MeasurementType } from '../../../queries/measurements';
import { MenuItem, Select } from '@mui/material';


interface IPopupWrapper {
	defaultOptions: Required<ActiveMeasProperties>;
	setOptions: (newOpts: Required<ActiveMeasProperties>) => void;
}

const PopupWrapper: FC<IPopupWrapper> = ({ defaultOptions, setOptions }) => {

	const [state, setState] = useState(defaultOptions);

	const { name, dbName, rendererName, color } = state;

	const update = (key: keyof ActiveMeasProperties) => (val: any) => {
		const temp = { ...state } as any;
		temp[key] = val;
		setState(temp);
		setOptions(temp);
	};

	const inputChange = (key: keyof ActiveMeasProperties) => (target: any) => {
		update(key)(target);
	};

	const [getMeasTypes, setMeasTypes] = useState<MeasurementType[]>([]);

	useEffect(() => {
		getMeasurementTypes(setMeasTypes);
	}, []);

	const [getSelectedMeasType, setSelectedMeasType] = useState<string>('');

	const handleChange = (event: any, child: any) => {
		const selectedValue = event.target.value;
		setSelectedMeasType(selectedValue);
		inputChange('dbName')(selectedValue);
	};

	return (
		<div className='popup-wrapper'>
			<input id='sweetalert-input' className='sweetalert-input' placeholder='Name..' type='text' defaultValue={name}
				   onChange={(enteredName) => {inputChange('name')(enteredName.target.value)}} />

			<Select
				labelId=''
				id='select-tag-dropdown-menu'
				value={dbName ? dbName : (getSelectedMeasType ? getSelectedMeasType : 'tag')}
				label='Tags'
				onChange={(handleChange)}
			>
				<MenuItem value={'tag'} disabled={true}>Tag..</MenuItem>
				{getMeasTypes.map((value, index) => {
					return (<MenuItem key={index} value={value.type}>{value.type}</MenuItem>);
				})
				}
			</Select>

			<div className='sweetalert-checkboxes'>
				{Object.keys(RendererName).map((rName: string, i: number) =>
					<Checkbox
						key={`sweetalert-checkbox-${i}`}
						className='ride-metadata-checkbox'
						html={<div style={{ textTransform: 'capitalize' }}>{rName}</div>}
						forceState={rName === rendererName}
						onClick={() => update('rendererName')(rName)} />,
				)}
			</div>

			{rendererTypes[rendererName].usePalette
				? <Gradient
					key={`gradient-${rendererName}`}
					defaultColors={rendererTypes[rendererName].defaultPalette}
					cursorOptions={{ grid: true, samples: 40 }}
					pickerOptions={{ showCircles: false }}
					onChange={update('palette')} />
				: <TwitterPicker color={color} onChange={c => update('color')(c.hex)} />
			}
		</div>
	);
};

export default PopupWrapper;