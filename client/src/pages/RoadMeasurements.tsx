import { MeasurementsProvider } from "../context/MeasurementsContext";
import { MetasProvider } from "../context/MetasContext";

import RideDetails from "../components/RoadMeasurements/RideDetails";
import Rides from "../components/RoadMeasurements/Rides";


const RoadMeasurements = () => {

    return (
        <MeasurementsProvider>
        <MetasProvider>
            <div className="rides-wrapper">
                <RideDetails  />
                <Rides />
            </div>
        </MetasProvider>
        </MeasurementsProvider>
  )
}

export default RoadMeasurements;
