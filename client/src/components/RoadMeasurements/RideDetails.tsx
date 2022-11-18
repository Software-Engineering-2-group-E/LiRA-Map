import React, {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Autocomplete, Box, FormControl, List, ListItem, Stack, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../store";
import RideListComponent from "./RideListComponent";
import RideListComponentDetails from "./RideListComponentDetails";
import {Ride} from "../../models/ride";


export default function RideDetails() {
    const filters = ["Track position", "Interpolation", "Engine RPM"];
    const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const dispatch = useDispatch<Dispatch>();

    const [selectedRide, setSelectedRide] = useState<Ride>({});

    let rides = useSelector(
        (state: RootState) => state.rides
    )

    useEffect(() => {
        dispatch.rides.fetchRides();
    }, [dispatch.rides]);

    const handleChangeFrom = (newDate: Dayjs | null) => {
        setDateFrom(newDate)
    }
    const handleChangeTo = (newDate: Dayjs | null) => {
        setDateTo(newDate)
    }

    return (
        <Stack sx={{width: 350}} spacing={2}>
            <FormControl variant="standard">
                <Autocomplete
                    multiple
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Measurement types"
                        />
                    )} options={filters}
                />
            </FormControl>
            <Stack justifyContent="space-between" direction="row">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        label="From"
                        inputFormat="DD/MM/YYYY"
                        value={dateFrom}
                        onChange={handleChangeFrom}
                        renderInput={(params: any) => <TextField variant="standard" sx={{maxWidth: 125}}{...params} />}
                    />
                    <DesktopDatePicker
                        label="To"
                        inputFormat="DD/MM/YYYY"
                        value={dateTo}
                        onChange={handleChangeTo}
                        renderInput={(params: any) => <TextField variant="standard" sx={{maxWidth: 125}}{...params} />}
                    />
                </LocalizationProvider>
            </Stack>
            <Stack direction="row">
                <Box>
                    {
                        rides?.map((ride) => {
                            return <ListItem onClick={() => {setSelectedRide(ride)}}>
                                <RideListComponent ride={ride}/>
                            </ListItem>
                        })
                    }
                </Box>
                {
                    selectedRide.TripId && <RideListComponentDetails ride={selectedRide} />
                }
            </Stack>
        </Stack>
    );
}