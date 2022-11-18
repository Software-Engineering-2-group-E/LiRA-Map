// components
import Page from '../components/Page';
import RideDetails from "../components/RoadMeasurements/RideDetails";

import "leaflet/dist/leaflet.css"
import "../css/map.css"
import "../css/ridecard.css"
import {Stack} from "@mui/material";

// ----------------------------------------------------------------------

export default function RoadMeasurement() {
    return (
        <Page title="Road Measurement">
            {/*TODO: Remove the classname rides-wrapper as soon as possible*/}
            <Stack direction="row" className="rides-wrapper">
                <RideDetails/>
            </Stack>
        </Page>
    );
}

