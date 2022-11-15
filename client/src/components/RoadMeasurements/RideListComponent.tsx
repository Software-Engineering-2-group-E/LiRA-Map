import {Stack, TextField} from "@mui/material";

export default function RideListComponent() {
    return (
        <Stack direction="column">
            <TextField
                label="hej1"
                inputProps={{
                readOnly: true,
            }}/>
            <TextField
                label="hej2"
                inputProps={{
                readOnly: true,
            }}/>
        </Stack>
    );
}