import { FC, useEffect, useState } from 'react';

import { useMeasurementsCtx } from '../../context/MeasurementsContext';
import { GraphProvider } from '../../context/GraphContext';
import { useMetasCtx } from '../../context/MetasContext';

import { MeasMetaPath } from '../../models/path';

import { getRide } from '../../queries/rides';

import RidesMap from './RidesMap';
import usePopup from '../createPopup';
import RideGraphCard from './RideGraphCard';

const Rides: FC = () => {

	const { selectedMetas } = useMetasCtx();
	const { selectedMeasurements } = useMeasurementsCtx();

    const [ swal, popup ] = usePopup()
	
    const [ paths, setPaths ] = useState<MeasMetaPath>({});

	useEffect(() => {
		const updatePaths = async () => {
			const temp = {} as MeasMetaPath;

			for (let meas of selectedMeasurements) {
				const { name } = meas;
				temp[name] = {};

				for (let meta of selectedMetas) {
					const { TaskId } = meta;

					if (Object.hasOwn(paths, name) && Object.hasOwn(paths[name], TaskId))
						temp[name][TaskId] = paths[name][TaskId];
					else {
						const bp = await getRide(meas, meta, popup);
						if (bp !== undefined)
							temp[name][TaskId] = bp;
					}
				}
			}
			return temp;
		};

		updatePaths().then(setPaths);

	}, [selectedMetas, selectedMeasurements]);

	return (
		<GraphProvider>
			<RidesMap
				paths={paths}
				selectedMetas={selectedMetas}
				selectedMeasurements={selectedMeasurements} />
			<RideGraphCard paths={paths} selectedMeasurements={selectedMeasurements} />
		</GraphProvider>
	);
};

export default Rides;