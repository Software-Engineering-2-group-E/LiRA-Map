import { MeasurementsProvider } from "../context/MeasurementsContext";
import { MetasProvider } from "../context/MetasContext";

import RideDetails from "../components/RoadMeasurements/RideDetails";
import RideCards from "../components/RoadMeasurements/RideCards";
import Rides from "../components/RoadMeasurements/Rides";


const RoadMeasurements = () => {

    return (
        <MeasurementsProvider>
        <MetasProvider>
            <div className="rides-wrapper">
                
                <RideCards />
                
                <RideDetails  />
                
                <Rides />
                
            </div>
        </MetasProvider>
        </MeasurementsProvider>
  )
}

export default RoadMeasurements;
