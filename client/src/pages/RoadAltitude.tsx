//@Author(s) s184234

// @mui
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

import * as React from 'react';
import { useEffect, useState } from 'react';

import Panel from '../components/Altitude/Panel';
import MapWrapper from '../components/Map/MapWrapper';
import Heatmap from '../components/Map/Renderers/Heatmap';
import DistHotline from '../components/Map/Renderers/DistHotline';

import { Node, WaysConditions } from '../models/path';

import { getAltitudes } from '../queries/altitude';

import { HEATMAP_OPTIONS, RENDERER_OPTIONS } from '../components/Map/constants';

import 'leaflet/dist/leaflet.css';
import '../css/altitude.css';

// ----------------------------------------------------------------------

export default function RoadAltitude() {
	const { themeStretch } = useSettings();
	const [altitudes, setAltitudes] = useState<WaysConditions>();
	const [showHotline, setShowHotline] = useState<boolean>(false);
	const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

	useEffect(() => {
		getAltitudes((data: WaysConditions) => {
			setAltitudes(data);
		});
	}, []);

	const options = [
		{ name: 'Hotline', isSelected: showHotline, toggle: toggleShowHotline },
		{ name: 'Heatmap', isSelected: showHeatmap, toggle: toggleShowHeatmap },
	];

	function toggleShowHeatmap() {
		console.log(`Toggling showHeatMap => ${!showHeatmap}`);
		setShowHeatmap(!showHeatmap);
	}

	function toggleShowHotline() {
		console.log(`Toggling showHotline => ${!showHotline}`);
		setShowHotline(!showHotline);
	}

	return (
		<Page title='Road Altitude'>
			<div className='altitude-wrapper'>
				<MapWrapper>
					<Panel options={options} />
					{showHotline && altitudes
						? <DistHotline
							way_ids={altitudes.way_ids}
							geometry={altitudes.geometry}
							conditions={altitudes.conditions}
							options={{ min: 0, max: 140 }} />
						: null
					}
					{showHeatmap && altitudes
						? <Heatmap
							data={altitudes.geometry.flat()}
							getLat={(t: Node) => t.lat}
							getLng={(t: Node) => t.lng}
							getVal={(t: Node) => 2}
							options={{
								...RENDERER_OPTIONS, // temporary fix
								max: 10,
								width: 20,
								palette: HEATMAP_OPTIONS.palette,
							}} />
						: null}
				</MapWrapper>
			</div>
		</Page>
	);
}
