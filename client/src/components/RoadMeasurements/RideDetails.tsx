import React, {useEffect, useState} from "react";
import {Autocomplete, Box, FormControl, List, ListItem, Stack, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../store";
import RideListComponent from "./RideListComponent";
import RideListComponentDetails from "./RideListComponentDetails";
import {Ride} from "../../models/ride";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";


export default function RideDetails() {
    const filters = ["Track position", "Interpolation", "Engine RPM"];
    const [dateFrom, setDateFrom] = React.useState<Date | null>(() => new Date(Date.now()));
    const [dateTo, setDateTo] = React.useState<Date | null>(() => new Date(Date.now()));
    const dispatch = useDispatch<Dispatch>();

    const [selectedRide, setSelectedRide] = useState<Ride>({});

    let rides = useSelector(
        (state: RootState) => state.rides
    )

    useEffect(() => {
        dispatch.rides.fetchRides();
    }, [dispatch.rides]);

    const handleChangeTo = (newDate: Date) => {
        setDateTo(newDate)
    }

    return (
        <Stack sx={{width: 350, height: 700}} spacing={2}>
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="From"
                        value={dateFrom}
                        onChange={(newDate) => {
                            setDateFrom((newDate))
                        }}
                        renderInput={(params: any) => <TextField variant="standard" sx={{maxWidth: 125}}{...params} />}
                    />
                    <DatePicker
                        label="To"
                        value={dateTo}
                        onChange={(newDate) => {
                            setDateTo(newDate)
                        }}
                        renderInput={(params: any) => <TextField variant="standard" sx={{maxWidth: 125}}{...params} />}
                    />
                </LocalizationProvider>
            </Stack>
            <Stack direction="row" style={{maxHeight: '100%', overflow: 'auto'}}>
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