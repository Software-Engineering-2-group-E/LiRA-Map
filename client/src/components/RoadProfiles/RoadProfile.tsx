import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import TabContext from '@mui/lab/TabContext';
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import CheckboxList from "./CheckboxList";
import Graph from "./Graph";
import { useState, SyntheticEvent, useRef} from "react";
import {RoadData} from "../../pages/RoadCondition";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import segments from "../CarData/Segments";
import {boolean} from "../../_mock/boolean";
import useSize from "../../hooks/useSize";

export interface RoadProfileProps {
    roadData: RoadData,
    width: string
}

export default function RoadProfile({roadData, width}: RoadProfileProps) {

    const ref = useRef(null)
    const [ _, height ] = useSize(ref)

    const [checked, setChecked] = useState<boolean[]>(new Array(roadData.segmentList.length).fill(true));
    const [value, setValue] = useState("1");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const taps = [
        {name: 'Condition', color: 'rgba(83, 136, 216, 0.6)'},
        {name: 'Energy', color: 'rgba(83, 216, 136, 0.6)'},
        {name: 'Friction', color: 'rgba(216, 83, 83, 0.6)'},
        {name: 'Altitude', color: 'rgba(136, 136, 136, 0.6)'},
    ];

    const [ open, setOpen ] = useState<boolean>(true);

    return (
        <Card sx={{
            zIndex: 1000,
            position: "absolute",
            width: open ? width : "auto",
            height: open ? 'auto' : "auto",
            ml: 2,
            mb: 2,
            bottom: 0
        }}>
            <CardContent>
                {!open && <IconButton onClick={() => setOpen(true)}><ExpandMoreIcon style={{transform: "rotate(-90deg)"}}/></IconButton>}
                {open && (
                    <Grid container spacing={1} columns={16}>
                        <Grid item xs={1}>
                            <IconButton onClick={() => setOpen(false)}><ExpandMoreIcon style={{transform: "rotate(90deg)"}}/></IconButton>
                        </Grid>
                        <Grid item xs={15}>
                            <Typography variant="h5" sx={{mt: 1, ml: 1}}>{roadData.roadName}</Typography>
                        </Grid>
                    <Grid item xs={3}>
                        <Button variant="outlined">ADD TO LIST</Button>
                        <CheckboxList checked={checked} setChecked={setChecked}/>
                    </Grid>
                    <Grid item xs={13} ref={ref}>
                        <TabContext value={value}>
                            <TabList onChange={handleChange}>
                                {taps.map((t, value) => {
                                    return (
                                        <Tab label={t.name} value={(value + 1).toString()}/>
                                    );
                                })}
                            </TabList>
                            {taps.map((t, value) => {
                                return (
                                    <TabPanel value={(value + 1).toString()}>
                                        <Graph
                                            segments={roadData.segmentList.filter((segment, index) => checked[index])}
                                            name={t.name}
                                            color={t.color}
                                            value={value}/>
                                    </TabPanel>
                                );
                            })}
                        </TabContext>
                    </Grid>
                </Grid>
                )}
            </CardContent>
        </Card>
    );
}