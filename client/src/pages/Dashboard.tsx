//@Author(s) s204442

// MUI
import Grid from '@mui/material/Grid';
import {Box, Typography} from "@mui/material";
// Components
import {RootState} from "../store";
import {useSelector} from "react-redux";
import CriticalRoadsTable from "../components/Dashboard/CriticalRoadsTable";
import RoadConditionsChart from "../components/Dashboard/RoadConditionsChart";

const Dashboard = () => {

    // User Information
    const { userData } = useSelector((state: RootState) => state.access)

    return (
        <Grid container spacing={2} style={{ width: '100%' }}>
            <Grid item xs={4}>
                <Box sx={{ height: '100%', p: 2, border: '1px grey', borderRadius: '5px', boxShadow: 2 }}>
                    <Typography variant="h5">Welcome, {userData?.firstName}!</Typography>
                    <Typography>Here is an overview of your roads' conditions.</Typography>

                    <Box sx={{ p: 2 }}></Box>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <Typography sx={{fontWeight: 'bold'}} noWrap>Anker Engelunds Vej</Typography>
                        <Typography noWrap>&nbsp;has deteriorated by 7% in the past week.</Typography>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <Typography sx={{fontWeight: 'bold'}} noWrap>Lyngbyvej</Typography>
                        <Typography noWrap>&nbsp;has gotten 2 new potholes in the past week.</Typography>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <Typography sx={{fontWeight: 'bold'}} noWrap>Kanalvej</Typography>
                        <Typography noWrap>&nbsp;has deteriorated by 5% in the past week.</Typography>
                    </div>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box sx={{ p: 2, border: '1px grey', borderRadius: '5px', boxShadow: 2 }}>
                    <Typography variant="h5">Critical Roads</Typography>
                    <CriticalRoadsTable></CriticalRoadsTable>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ p: 2, border: '1px grey', borderRadius: '5px', boxShadow: 2 }}>
                    <Typography variant="h5">Condition of your roads</Typography>
                    <RoadConditionsChart></RoadConditionsChart>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Dashboard;