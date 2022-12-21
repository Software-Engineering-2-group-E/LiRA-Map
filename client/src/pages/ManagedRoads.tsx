//@Author(s) s204433

import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import RoadProfile from "../components/RoadProfiles/RoadProfile";
import {RoadData} from "./RoadCondition";

import { rows } from '../components/Dashboard/CriticalRoadsTable';

const ManagedRoads = () => {

    function generateData(length: number): number[] {
        return [...new Array(length)].map(() => Math.random() * 100)
    }

    function generateRoad(length: number): RoadData {
        const index = Math.floor(Math.random() * rows.length);

        const list = new Array(length)
        for(let i = 0; i < length; i++) {
            list[i] = ({segmentId: i, data: generateData(100)})
        }

        return {
            roadId: rows[index].roadId,
            roadName: rows[index].roadName,
            segmentList: list
        }
    }

    return (
        <List>
            {
                [...new Array(5)].map((_, index) => (
                    <ListItem key={index}>
                        <RoadProfile roadData={generateRoad(Math.round((Math.random() * (20 - 10)) + 10))} width={'100%'}/>
                    </ListItem>
                    )
                )
            }
        </List>
    )
}

export default ManagedRoads;