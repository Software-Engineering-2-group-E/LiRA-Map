import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {index} from "d3";
import {boolean} from "../../_mock/boolean";

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
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                maxHeight: 200,
                '& ul': { padding: 0 },
            }}
            subheader={<li />}>
            {checked.map((check,value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <ListItem
                        key={value}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                            <ListItemText id={labelId} primary={`Seg ${value + 1}`} />
                            <ListItemIcon >
                                <Checkbox
                                    edge="start"
                                    checked={check}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}

                                />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}