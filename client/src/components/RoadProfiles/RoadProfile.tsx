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

export default function RoadProfile({roadData} : RoadProfileProps) {

    const [checked, setChecked] = useState<boolean[]>(new Array(roadData.segmentList.length).fill(true));


    const [value, setValue] = useState('1');
    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant="h5">{roadData.roadName}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Button variant="outlined">ADD TO LIST</Button>

                        <CheckboxList checked={checked}
                                      setChecked={setChecked}/>

                    </Grid>
                    <Grid item xs={5}>
                        <TabContext value={value}>
                            <TabList onChange={handleChange}>
                                <Tab label="Condition" value="1"/>
                                <Tab label="Energy" value="2"/>
                                <Tab label="Friction" value="3"/>
                                <Tab label="Altitude" value="4"/>
                            </TabList>
                            <TabPanel value="1">
                                <div></div>
                                <Graph segments={roadData.segmentList.filter((segment,index) => checked[index])}
                                       type={0}/>
                            </TabPanel>
                            <TabPanel value="2">
                                <Graph segments={roadData.segmentList.filter((segment,index) => checked[index])}
                                       type={1}/>
                            </TabPanel>
                            <TabPanel value="3">
                                <div></div>
                                <Graph segments={roadData.segmentList.filter((segment,index) => checked[index])}
                                       type={2}/>
                            </TabPanel>
                            <TabPanel value="4">
                                <Graph segments={roadData.segmentList.filter((segment,index) => checked[index])}
                                       type={3}/>
                            </TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}