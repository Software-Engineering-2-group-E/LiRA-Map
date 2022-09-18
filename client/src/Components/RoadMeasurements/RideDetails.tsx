import React, { FC, useState } from "react";

import useMeasPopup from "./Popup/useMeasPopup";
import Checkbox from "../Checkbox";
import MetaData from "./MetaData";

import { useMeasurementsCtx } from "../../context/MeasurementsContext";
import { useMetasCtx } from "../../context/MetasContext";

import { addMeasurement } from "../../queries/measurements";
import { MeasProperties, ActiveMeasProperties } from "../../models/properties";
import { RideMeta } from "../../models/models";

import { RENDERER_MEAS_PROPERTIES } from "../Map/constants";

import MeasCheckbox from "./MeasCheckbox";


const RideDetails: FC = () => {

	const { selectedMetas } = useMetasCtx()

	const { measurements, setMeasurements } = useMeasurementsCtx()
	const [ addChecked, setAddChecked ] = useState<boolean>(false)
	
	const popup = useMeasPopup()

	const editMeasurement = (meas: ActiveMeasProperties, i: number) => (e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		popup( 
			(newMeas: ActiveMeasProperties) => {
				const temp = [...measurements]
				temp[i] = newMeas;
				setMeasurements( temp )
			}, 
			{ ...RENDERER_MEAS_PROPERTIES, ...meas } 
		)
	}

	const showAddMeasurement = () => {
		setAddChecked(true) 
		popup( 
			(newMeasurement: ActiveMeasProperties ) => {
				setAddChecked(false) 
				// update the state in RideDetails
				setMeasurements( prev => [...prev, newMeasurement])
				// and add the measurement to the measurements.json file
				addMeasurement(newMeasurement);
			},
			RENDERER_MEAS_PROPERTIES 
		)
	}

    const selectMeasurement = (i: number) => (isChecked: boolean) => {        
        const temp = [...measurements]
        temp[i].isActive = isChecked
        setMeasurements(temp)
    }

    return (
		<div className="meta-data">
			{ measurements.map( (m: ActiveMeasProperties, i: number) =>
				<MeasCheckbox 
					key={`meas-checkbox-${i}`}
					meas={m}
					selectMeasurement={selectMeasurement(i)}
					editMeasurement={editMeasurement(m, i)} />
			) }

			<Checkbox 
				className='ride-metadata-checkbox md-checkbox-add'
				html={<div>+</div>}
				forceState={addChecked}
				onClick={showAddMeasurement} />
			
			{ selectedMetas.map( (meta: RideMeta, i: number) =>
				<MetaData md={meta} key={`md-${Math.random()}`} />
			) }
        </div>
  )
}

export default RideDetails;