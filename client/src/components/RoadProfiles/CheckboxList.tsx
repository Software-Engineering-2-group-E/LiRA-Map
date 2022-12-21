//Author(s) s204486, s204433

import * as React from 'react';
import {ToggleButton, ToggleButtonGroup} from "@mui/material";

export interface CheckboxListProps {
    checked : boolean[],
    setChecked :   React.Dispatch<React.SetStateAction<boolean[]>>,
    maxHeight: number
}
export default function CheckboxList({checked, setChecked, maxHeight} : CheckboxListProps) {
    const handleToggle = (value: number) => () => {
        setChecked(checked.map((check, index) => index === value ? !check : check));
    };

    return (
        <ToggleButtonGroup
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: maxHeight, overflowY: 'scroll' }}
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