//@Author(s) s204433

import { FC, useEffect, useState } from "react";

import { getConnection } from "../../queries/connection";
//import { Error, CheckCircle, Pending } from "@mui/icons-material";
import { Circle } from '@mui/icons-material';
import { green, yellow, red } from '@mui/material/colors'

const Connection: FC = () => {

    const [ connection, setConnection ] = useState<boolean | null>(null)

    useEffect(() => {
        const id = setInterval(() => getConnection(setConnection), 10000);

        return () => {
            clearInterval(id);
        };
    }, []);

    return (
        <Circle stroke={'white'} strokeWidth={2} sx={{ fontSize: 15, color: (connection === true) ? green[500] : (connection === false ? red[500] : yellow[500]) }}/>
    )
}

export default Connection;