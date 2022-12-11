import React, { FC, useState } from 'react';

import useMeasPopup from './Popup/useMeasPopup';

import { useMeasurementsCtx } from '../../context/MeasurementsContext';

import { addMeasurement } from '../../queries/measurements';
import { ActiveMeasProperties } from '../../models/properties';

import { RENDERER_MEAS_PROPERTIES } from '../Map/constants';
import { Button, Chip, Paper, Stack } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
// 	root: {
// 		display: 'flex',
// 		justifyContent: 'center',
// 		flexWrap: 'wrap',
// 		listStyle: 'none',
// 		padding: theme.spacing(0.5),
// 		margin: 0,
// 	},
// 	chip: {
// 		margin: theme.spacing(0.5),
// 	},
// }));

const MeasurementTypes: FC = () => {
	const { measurements, setMeasurements } = useMeasurementsCtx();
	const [addChecked, setAddChecked] = useState<boolean>(false);

	const popup = useMeasPopup();

	const editMeasurement = (meas: ActiveMeasProperties, i: number) => (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		popup(
			(newMeas: ActiveMeasProperties, shouldDelete: boolean) => {
				const temp = [...measurements];
				if (shouldDelete) {
					temp.splice(i, 1)
					setMeasurements(temp);
				} else {
					temp[i] = newMeas;
					setMeasurements(temp);
				}
			},
			true,
			{ ...RENDERER_MEAS_PROPERTIES, ...meas },
		);
	};

	const showAddMeasurement = () => {
		setAddChecked(true);
		popup(
			(newMeasurement: ActiveMeasProperties) => {

				setAddChecked(false); // TODO fjern behovet for det her weirdness
				// update the state in RideDetails
				setMeasurements(prev => [...prev, newMeasurement]);
				// and add the measurement to the measurements.json file
				// addMeasurement(newMeasurement); // TODO laura: i disabled this because it creates "null" entries
			},
			false,
			RENDERER_MEAS_PROPERTIES,
		);
	};

	const selectMeasurement = (i: number) => (isChecked: boolean) => {
		const temp = [...measurements];
		temp[i].isActive = isChecked;
		setMeasurements(temp);
	};
	const filters = ['Track position', 'Interpolation', 'Engine RPM'];

	return (
		<Stack direction={'row'}>
			<Paper component='ul' sx={{
				width: 500, display: 'flex',
				justifyContent: 'center',
				flexWrap: 'wrap',
				listStyle: 'none',
				padding: 0.5,
				margin: 0,
			}}>
				{measurements.map((m: ActiveMeasProperties, i: number) => {
					return (
						<li key={`meas-li-${i}`}>
							<Chip sx={{ spacing: 0.5 }} label={m.name} onClick={editMeasurement(m, i)} />
						</li>
					);
				})}
			</Paper>
			<Button onClick={showAddMeasurement}>
				Add...
			</Button>
		</Stack>

		// <FormControl variant='standard' fullWidth={true}>
		// 	<Autocomplete
		// 		multiple
		// 		renderInput={(params) => (
		// 			<TextField
		// 				{...params}
		// 				variant='standard'
		// 				label='Measurement types'
		// 			/>
		// 		)} options={filters}
		// 	/>
		// </FormControl>


		// <div className='meta-data'>
		// 	<div style={{ height: 350, overflow: 'scroll' }}>
		//
		// 		{measurements.map((m: ActiveMeasProperties, i: number) =>
		// 			<MeasCheckbox
		// 				key={`meas-checkbox-${i}`}
		// 				meas={m}
		// 				selectMeasurement={selectMeasurement(i)}
		// 				editMeasurement={editMeasurement(m, i)} />,
		// 		)}
		// 	</div>
		//
		// 	<Checkbox
		// 		className='ride-metadata-checkbox md-checkbox-add'
		// 		html={<div>+</div>}
		// 		forceState={addChecked}
		// 		onClick={showAddMeasurement} />
		// </div>
	);
};

export default MeasurementTypes;


// TODO: measurements.json inden jeg slettede de fleste pga manglende error handling:
//
// [
// 	{
// 		"rendererName": "circles",
// 		"dbName": "track.pos",
// 		"name": "Track Position",
// 		"color": "#ff6900",
// 		"hasValue": false
// 	},
// 	{
// 		"rendererName": "line",
// 		"dbName": "acc.xyz",
// 		"name": "Interpolation",
// 		"color": "#9900ef",
// 		"width": 1,
// 		"hasValue": false
// 	},
// 	{
// 		"rendererName": "hotline",
// 		"dbName": "obd.rpm",
// 		"name": "Engine RPM",
// 		"color": "#7bdcb5",
// 		"hasValue": true
// 	},
// 	{
// 		"rendererName": "hotline",
// 		"dbName": "obd.trac_cons",
// 		"name": "Traction Instant Consumption",
// 		"color": "#00d084",
// 		"hasValue": true
// 	},
// 	{
// 		"rendererName": "hotline",
// 		"dbName": "obd.rpm_fl",
// 		"name": "RPM Frontleft",
// 		"color": "#00d084",
// 		"hasValue": true
// 	},
// 	null,
// 	null,
// 	null
// ]