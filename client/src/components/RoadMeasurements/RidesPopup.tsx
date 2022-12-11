import { Card, CardContent, Grid } from '@mui/material';

import RideCardsA from './RideCardsA';
import RideDetailsA from './RideDetailsA';
import MeasurementTypes from './MeasurementTypes';
import OptionsSelector from './OptionsSelector';

export default function RidesPopup() {
	return (
		<Card sx={{
			zIndex: 1000,
			position: 'absolute',
			width: 450,
			height: window.innerHeight - 40,
			ml: 2,
			mt: 2
		}}>
			<CardContent >
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<MeasurementTypes />
					</Grid>
					<Grid item xs={12}>
						<OptionsSelector />
					</Grid>
					<Grid item xs={6}>
						<RideCardsA />
					</Grid>
					<Grid item xs={6}>
						<RideDetailsA />
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}