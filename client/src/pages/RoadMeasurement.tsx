//@Author(s) s184234, s204442, s204433, s184230, s175182

// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

import { MeasurementsProvider } from '../context/MeasurementsContext';
import { MetasProvider } from '../context/MetasContext';
import Rides from '../components/RoadMeasurements/Rides';
import RidesPopup from '../components/RoadMeasurements/RidesPopup';


export default function RoadMeasurement() {
	const { themeStretch } = useSettings();

	return (
		<Page title='Road Measurement' >
			<MeasurementsProvider>
				<MetasProvider>
					<div className='rides-wrapper' >
						<RidesPopup />
						<Rides />
					</div>
				</MetasProvider>
			</MeasurementsProvider>
		</Page>
	);
}

