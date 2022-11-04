import {FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";

export default function RideDetails() {

	const [personName, setPersonName] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		);
	};

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
					renderValue={(selected) => (
						<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
							{selected.map((value) => (
								<Chip key={value} label={value} />
							))}
						</Box>
					)}
					MenuProps={MenuProps}
				>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(name, personName, theme)}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}