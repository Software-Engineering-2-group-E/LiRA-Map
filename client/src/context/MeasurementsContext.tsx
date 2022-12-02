import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useEffect,
	useState,
} from "react";

import { ActiveMeasProperties } from "../models/properties";
import { getMeasurements, getMeasurementTypes, MeasurementType } from "../queries/measurements";

interface ContextProps {
	measurements: ActiveMeasProperties[];
    setMeasurements: Dispatch<SetStateAction<ActiveMeasProperties[]>>;
	selectedMeasurements: ActiveMeasProperties[];
	measurementTypes: string[];
}

const MeasurementsContext = createContext({} as ContextProps);

export const MeasurementsProvider = ({ children }: any) => {

	const [ measurements, setMeasurements ] = useState<ActiveMeasProperties[]>([])
	const [ selectedMeasurements, setSelectedMeasurements ] = useState<ActiveMeasProperties[]>([])
	const measurementTypes = ["obd.rpm","acc.xyz"] // TODO: Read measurement types from DB instead

	useEffect( () => setSelectedMeasurements( measurements.filter(m => m.isActive)), [measurements] )

	const [ getMeasTypes, setMeasTypes ] = useState<MeasurementType[]>([])

	useEffect( () => {
		//getMeasurements(setMeasurements)
		console.log("Getting measurement types from measurements/types")
		getMeasurementTypes(setMeasTypes)
	}, [] )

	useEffect( () => {
		console.log("Measurement types found in db:")
		console.log( getMeasTypes )
	}, [ getMeasTypes ])



	return (
		<MeasurementsContext.Provider
			value={{
				measurements,
				setMeasurements,
				selectedMeasurements,
				measurementTypes
			}}
		>
			{children}
		</MeasurementsContext.Provider>
	);
};

export const useMeasurementsCtx = () => useContext(MeasurementsContext);