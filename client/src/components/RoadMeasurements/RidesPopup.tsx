//@Author(s) s204442, s204433

import * as React from 'react';
import { useState } from 'react';

import { Card, CardContent, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

import RideCards from './RideCards';
import RideDetails from './RideDetails';
import MeasurementTypes from './MeasurementTypes';
import OptionsSelector from './OptionsSelector';
import useWindowSize from '../../hooks/useWindowSize';

export default function RidesPopup() {
	const [_, height] = useWindowSize();

	const [open, setOpen] = useState<boolean>(true);

	return (
		<Card sx={{
			zIndex: 1000,
			position: 'absolute',
			width: open ? 450 : 'auto',
			height: open ? height - 37 : 'auto',
			ml: 2,
			mt: 2,
		}}>
			<CardContent>
				{!open &&
					<IconButton onClick={() => setOpen(true)}><ExpandMoreIcon style={{ transform: 'rotate(-90deg)' }} /></IconButton>}
				{open && (
					<Grid container spacing={2}>
						<Grid item xs={2}>
							<IconButton onClick={() => setOpen(false)}><ExpandMoreIcon
								style={{ transform: 'rotate(90deg)' }} /></IconButton>
						</Grid>
						<Grid item xs={10}>
							<MeasurementTypes />
						</Grid>
						<Grid item xs={12}>
							<OptionsSelector />
						</Grid>
						<Grid item xs={6}>
							<RideCards height={height} />
						</Grid>
						<Grid item xs={6}>
							<RideDetails height={height} />
						</Grid>
					</Grid>
				)}
			</CardContent>
		</Card>
	);
}