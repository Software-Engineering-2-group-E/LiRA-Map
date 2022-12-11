import { Card, CardContent, Grid } from '@mui/material';

import RideCardsA from './RideCardsA';
import RideDetailsA from './RideDetailsA';
import MeasurementTypes from './MeasurementTypes';
import OptionsSelector from './OptionsSelector';
import useWindowSize from "../../hooks/UseWindowSize";

export default function RidesPopup() {
	const [ _, height ] = useWindowSize();

	return (
		<Card sx={{
			zIndex: 1000,
			position: 'absolute',
			width: 450,
			height: height - 37,
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
						<RideCardsA height={height}/>
					</Grid>
					<Grid item xs={6}>
						<RideDetailsA height={height}/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}