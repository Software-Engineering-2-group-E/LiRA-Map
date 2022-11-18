import {Stack, TextField} from "@mui/material";
import {Ride} from "../../models/ride";

interface rideProps {
    ride: Ride
}


export default function RideListComponent({ride}: rideProps) {
    const createdDate = ride.Created_Date ? new Date(ride.Created_Date) : null;
    const createdDateFormatted = createdDate?.getDay() + "." + createdDate?.getMonth() + "." + createdDate?.getFullYear();
    return (
        <Stack direction="column">
            <div>{ride.TaskId}</div>
            <div>{createdDateFormatted}</div>
        </Stack>
    );
}