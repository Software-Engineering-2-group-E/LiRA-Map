import {List, ListItem, ListItemText} from "@mui/material";
import {Ride} from "../../models/ride";

interface rideProps {
    ride: Ride
}

export default function RideListComponentDetails({ride}: rideProps) {
    return (
        <List>
            <ListItem>
                <ListItemText primary={`Trip ID: ${ride.TripId }`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Task ID: ${ride.TaskId }`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Start time: ${ride.StartTimeUtc }`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Stop time: ${ride.EndTimeUtc }`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Start position: ${ride.StartPositionLat} ${ride.StartPositionLat}`} />
            </ListItem>
            <ListItem>
                <ListItemText primary={`Stop position: ${ride.EndPositionLat} ${ride.EndPositionLng}`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Duration: ${ride.Duration }`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Distance travelled: ${ride.DistanceKm }`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`FK Device: ${ride.FK_Device }`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Updated date: ${ride.Updated_Date }`}/>
            </ListItem>
            <ListItem>
                <ListItemText primary={`Fully imported: ${ride.Fully_Imported }`}/>
            </ListItem>
        </List>
    )
}