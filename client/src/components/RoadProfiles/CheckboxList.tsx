import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {index} from "d3";
import {boolean} from "../../_mock/boolean";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

export interface CheckboxListProps {
    checked : boolean[],
    setChecked :   React.Dispatch<React.SetStateAction<boolean[]>>
}
export default function CheckboxList({checked, setChecked} : CheckboxListProps
) {
    const handleToggle = (value: number) => () => {
        setChecked(checked.map((check, index) => index === value ? !check : check));
    };

    return (
        <ToggleButtonGroup
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', position: 'relative', overflow: 'auto', maxHeight: 150, '& ul': { padding: 0 } }}
            aria-multiselectable={'true'}
            orientation={'vertical'}
        >
            {checked.map((check,value) => {
                return (
                    <ToggleButton key={`Seg ${value + 1}`} value={value} onClick={handleToggle(value)}>
                        {`Seg ${value + 1}`}
                    </ToggleButton>
                );
            })}
        </ToggleButtonGroup>
    );
}