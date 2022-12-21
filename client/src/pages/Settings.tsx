//@Author(s) s204442, s204433

// MUI
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Typography, FormGroup} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// Components
import {MaterialUISwitch} from '../components/MaterialUISwitch';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import useSettings from "../hooks/useSettings";
import {useState, SyntheticEvent} from "react";

const languages = [
    { label: 'Danish', id: 1 },
    { label: 'English', id: 2 },
];

const roles = [
    { label: 'Role 1', id: 1 },
    { label: 'Role 2', id: 2 },
    { label: 'Role 3', id: 2 },
];

const Settings = () => {
    // Theme Switch
    const { themeMode, onToggleMode } = useSettings();

    const isDark = themeMode === 'dark';

    // Tab Context
    const [value, setValue] = useState<string>("1");

    // User Information
    const { userData, userCredentials } = useSelector((state: RootState) => state.access)

    return (
        <Box sx={{ml: 2, mt: 1}}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={(event: SyntheticEvent, value: string) => setValue(value)}>
                        <Tab value="1" label="Profile" />
                        <Tab value="2" label="Account" />
                        <Tab value="3" label="Personalization" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Stack spacing={2} alignItems="start">
                        <Typography variant="h5" sx={{mt: 2}}>General Info</Typography>

                        <Typography variant="overline">First Name</Typography>
                        <TextField id="outlined-basic" placeholder="First Name" defaultValue={userData?.firstName} variant="outlined" />

                        <Typography variant="overline">Last Name</Typography>
                        <TextField id="outlined-basic" placeholder="Last Name" defaultValue={userData?.lastName} variant="outlined" />

                        <Typography variant="overline">Email</Typography>
                        <TextField id="outlined-basic" placeholder="Email" defaultValue={userCredentials?.user?.email} variant="outlined" />

                        <Button variant="contained">Save Information</Button>
                    </Stack>
                </TabPanel>
                <TabPanel value="2">
                    <Stack spacing={2} alignItems="start">
                        <Typography variant="h5" sx={{mt: 2}}>Password</Typography>

                        <Typography variant="overline">Old Password</Typography>
                        <TextField id="outlined-basic" placeholder="Old Password" variant="outlined" />

                        <Typography variant="overline">New Password</Typography>
                        <TextField id="outlined-basic" placeholder="New Password" variant="outlined" />

                        <Typography variant="overline">Confirm Password</Typography>
                        <TextField id="outlined-basic" placeholder="Confirm Password" variant="outlined" />

                        <Button variant="contained">Confirm</Button>

                        <Typography variant="h5">Delete Account</Typography>
                        <Typography>Would you like to delete your account?</Typography>
                        <Typography>Deleting your account will remove all the content associated with it.</Typography>
                        <Button variant="contained" color="error">I want to delete my account</Button>
                    </Stack>
                </TabPanel>
                <TabPanel value="3">
                    <Stack spacing={2} alignItems="start">
                        <Typography variant="h5" sx={{mt: 2}}>Preferences</Typography>

                        <Typography variant="overline">Role</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-lang"
                            options={roles}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <Typography variant="overline">Language</Typography>
                        <Autocomplete
                            disablePortal
                            id="combo-box-lang"
                            options={languages}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} />}
                        />

                        <Typography variant="overline">Theme</Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<MaterialUISwitch sx={{ m: 1 }} checked={isDark} onChange={onToggleMode}/>}
                                label={isDark ? 'Dark mode' : 'Light mode'}
                            />
                        </FormGroup>
                    </Stack>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default Settings;