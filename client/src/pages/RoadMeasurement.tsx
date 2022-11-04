// components
import Page from '../components/Page';

import {MeasurementsProvider} from "../context/MeasurementsContext";
import {MetasProvider} from "../context/MetasContext";

import RideDetails from "../components/RoadMeasurements/RideDetails";
import Rides from "../components/RoadMeasurements/Rides";

import "leaflet/dist/leaflet.css"
import "../css/map.css"
import "../css/ridecard.css"
import {Stack} from "@mui/material";

// ----------------------------------------------------------------------

export default function RoadMeasurement() {
    return (
        <Page title="Road Measurement">
            <MeasurementsProvider>
                <MetasProvider>
                    {/*TODO: Remove the classname rides-wrapper as soon as possible*/}
                    <Stack direction="row" className="rides-wrapper">
                        <RideDetails />
                        <Rides />
                    </Stack>
                </MetasProvider>
            </MeasurementsProvider>
        </Page>
    );
}

