//Author(s) s183816, s184234, s164420, s204433, s175182

import React, { FC, useEffect, useState } from 'react';

import { useMeasurementsCtx } from '../../context/MeasurementsContext';
import { GraphProvider } from '../../context/GraphContext';
import { useMetasCtx } from '../../context/MetasContext';
import { MarkerProvider } from '../../context/MarkerContext';

import { MeasMetaPath } from '../../models/path';

import { getRide } from '../../queries/rides';

import RidesMap from './RidesMap';
import usePopup from '../createPopup';
import RideGraphCard from './RideGraphCard';

const Rides: FC = () => {

	const { selectedMetas } = useMetasCtx();
	const { selectedMeasurements } = useMeasurementsCtx();

	const [swal, popup] = usePopup();

	const [paths, setPaths] = useState<MeasMetaPath>({});

	useEffect(() => {
		const updatePaths = async () => {
			const temp = {} as MeasMetaPath;

			for (let meas of selectedMeasurements) {
				const { name } = meas;
				temp[name] = {};

				for (let meta of selectedMetas) {
					const { TaskId } = meta;
					temp[name][TaskId] = {};

					if (Object.hasOwn(paths, name) && Object.hasOwn(paths[name], TaskId)) {
						for (let key of Object.keys(paths[name][TaskId])) {
							temp[name][TaskId][key] = paths[name][TaskId][key];
						}
					} else {
						const bps = await getRide(meas, meta, popup);
						if (!bps) break;

						for (let bp of bps) {
							if (!bp) break;

							temp[name][TaskId][bp.type] = bp;
						}
					}
				}
			}
			return temp;
		};

		updatePaths().then(setPaths);

	}, [selectedMetas, selectedMeasurements]);

	return (
		<GraphProvider>
			<MarkerProvider>
				<RidesMap
					paths={paths}
					selectedMetas={selectedMetas}
					selectedMeasurements={selectedMeasurements} />
				<RideGraphCard paths={paths} selectedMeasurements={selectedMeasurements} />
			</MarkerProvider>
		</GraphProvider>
	);
};

export default Rides;