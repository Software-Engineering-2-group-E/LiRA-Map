import {Box, Card, CircularProgress} from "@mui/material";

export default function LoadingIcon() {
    return <Card sx={{
        position: "absolute",
        height: 46,
        width: 46,
        zIndex: 2000,
        right: 40,
        mt: 2,
        mr: 2,
        justify: "center"
    }}>
        <Box sx={{alignItems: "center", m: 1}}>
            <CircularProgress size={30} color="warning"/>
        </Box>
    </Card>;
}