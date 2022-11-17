import React, {useEffect} from "react";
import dayjs, {Dayjs} from "dayjs";
import {Autocomplete, FormControl, Stack, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../store";

export default function RideDetails(this: any) {
    const filters = ["Track position", "Interpolation", "Engine RPM"];
    const [dateFrom, setDateFrom] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const [dateTo, setDateTo] = React.useState<Dayjs | null>(dayjs(Date.now()));
    const dispatch = useDispatch<Dispatch>()

    const {rides} = useSelector(
        (state: RootState) => state.rides
    )

    useEffect(() => {
        (async () => {
            await dispatch.rides.fetchRides()
        })();
    }, [dispatch.rides])

    const handleChangeFrom = (newDate: Dayjs | null) => {
        setDateFrom(newDate)
    }
    const handleChangeTo = (newDate: Dayjs | null) => {
        setDateTo(newDate)
    }

    return (
        <Stack sx={{width: 300}} spacing={2}>
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
            <div>
                {rides?.length}
            </div>
        </Stack>
    );
}