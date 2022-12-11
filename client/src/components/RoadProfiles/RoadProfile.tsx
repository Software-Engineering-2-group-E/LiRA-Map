import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
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
import {useEffect, useState, SyntheticEvent} from "react";
import {RoadData, Segment} from "../../pages/RoadCondition";
import segments from "../CarData/Segments";
import {boolean} from "../../_mock/boolean";

export interface RoadProfileProps {
    roadData: RoadData
}

export default function RoadProfile({roadData}: RoadProfileProps) {

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

    return (
        <Card sx={{width: 750}}>
            <CardContent>
                <Typography variant="h5">{roadData.roadName}</Typography>
                <Grid container spacing={1} columns={16}>
                    <Grid item xs={3}>
                        <Button variant="outlined">ADD TO LIST</Button>

                        <CheckboxList checked={checked}
                                      setChecked={setChecked}/>

                    </Grid>
                    <Grid item xs={13}>
                        <TabContext value={value}>
                            <TabList onChange={handleChange}>
                                {taps.map((t,value) => {
                                    return (
                                        <Tab label={t.name} value={(value+1).toString()}/>
                                    );
                                })}
                            </TabList>
                            {taps.map((t,value) => {
                                return(
                                    <TabPanel value={(value+1).toString()}>
                                        <Graph
                                            segments={roadData.segmentList.filter((segment, index) => checked[index])}
                                            name = {t.name}
                                            color = {t.color}
                                            value = {value}/>
                                    </TabPanel>
                                );
                            })}
                        </TabContext>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}