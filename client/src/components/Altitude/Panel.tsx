//@Author(s) s184234

import * as React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

interface Option {
	name: string;
	isSelected: boolean;
	toggle: () => void;
}

const Panel = (props: { options: Option[] }) => {
	const options: Option[] = props.options;

	return (
		<ToggleButtonGroup
			sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
			aria-multiselectable={'true'}
			orientation={'vertical'}
		>
			{options.map(o => {
				return (
					<ToggleButton key={o.name} value={o.isSelected} selected={o.isSelected} onClick={o.toggle}>
						{o.name}
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};

export default Panel;
