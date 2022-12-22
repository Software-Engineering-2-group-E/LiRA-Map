//@Author(s) s184234, s164420

import React, { FC, useState } from 'react';

import useMeasPopup from './Popup/useMeasPopup';

import { useMeasurementsCtx } from '../../context/MeasurementsContext';
import { ActiveMeasProperties } from '../../models/properties';

import { RENDERER_MEAS_PROPERTIES } from '../Map/constants';
import { Button, Chip, Paper, Stack } from '@mui/material';

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
					temp.splice(i, 1);
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

				setAddChecked(false);
				setMeasurements(prev => [...prev, newMeasurement]);
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
	);
};

export default MeasurementTypes;