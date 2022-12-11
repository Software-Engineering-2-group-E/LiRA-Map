import React, { useState } from 'react';
import { RideMeta, TripsOptions } from '../../models/models';
import { useMetasCtx } from '../../context/MetasContext';
import { Grid, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';


const defaultOptions: TripsOptions = {
	search: '',
	startDate: new Date('2020-01-01'),
	endDate: new Date(),
	reversed: false,
};

interface SelectMeta extends RideMeta {
	selected: boolean;
}

//
// const useStyles = makeStyles(theme => ({
// 	stretch: { height: "100%" },
// 	item: { display: "flex", flexDirection: "column" } // KEY CHANGES
// }));
//
// const Item = ({ title, content, ...rest }) => {
// 	const classes = useStyles();
//
// 	return (
// 		<Grid className={classes.item} item {...rest}>
// 			{content}
// 		</Grid>
// 	);
// };
export default function OptionsSelector() {

	const [options, setOptions] = useState<TripsOptions>(defaultOptions);
	const { metas, selectedMetas, setShowMetas } = useMetasCtx();

	const _onToggle = (key: string) => {
		// TODO: Terrible temp solution lol
		const optionsNew = { ...options } as any;
		var currentValue = optionsNew[key];
		optionsNew[key] = !currentValue;
		setOptions(optionsNew);
		const { search, startDate, endDate, reversed } = optionsNew;

		const temp: SelectMeta[] = metas
			.filter((meta: RideMeta) => {
				const inSearch = search === '' || meta.TaskId.toString().includes(search);
				const date = new Date(meta.Created_Date).getTime();
				const inDate = date >= startDate.getTime() && date <= endDate.getTime();
				return inSearch && inDate;
			})
			.map((meta: RideMeta) => {
				const selected = selectedMetas.find(({ TripId }) => meta.TripId === TripId) !== undefined;
				return { ...meta, selected };
			});

		setShowMetas(reversed ? temp.reverse() : temp);
	};

	const _onChange = (key: keyof TripsOptions) => {
		return function <T>(value: T) {
			console.log(key);
			console.log(value);
			const optionsNew = { ...options } as any;
			optionsNew[key] = value;
			setOptions(optionsNew);
			const { search, startDate, endDate, reversed } = optionsNew;

			const temp: SelectMeta[] = metas
				.filter((meta: RideMeta) => {
					const inSearch = search === '' || meta.TaskId.toString().includes(search);
					const date = new Date(meta.Created_Date).getTime();
					const inDate = date >= startDate.getTime() && date <= endDate.getTime();
					return inSearch && inDate;
				})
				.map((meta: RideMeta) => {
					const selected = selectedMetas.find(({ TripId }) => meta.TripId === TripId) !== undefined;
					return { ...meta, selected };
				});

			setShowMetas(reversed ? temp.reverse() : temp);
		};

	};

	return (
		<div className='rides-options'>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Grid container spacing={2} alignItems={'center'} justifyContent={'space-between'}>
					< Grid item xs={6}>
						<DatePicker onChange={_onChange('startDate')} value={options.startDate}
									className='options-date-picker'
									renderInput={(params: any) => <TextField variant='standard'
																			 sx={{ maxWidth: 125 }}{...params} />}
							// renderInput={(props) => <TextField {...props} />} 
						/>
					</Grid>

					<Grid item xs={6}>
						<DatePicker onChange={_onChange('endDate')} value={options.endDate}
									className='options-date-picker'
									renderInput={(params: any) => <TextField variant='standard'
																			 sx={{ maxWidth: 125 }}{...params} />} />

					</Grid>

					<Grid item xs={6}>
						<TextField
							className='ride-search-input'
							placeholder='Search..'
							value={options.search}
							onChange={e => _onChange('search')(e.target.value)}
							size={'small'} />
					</Grid>

					{/*// onClick={_onToggle('reversed')}*/}
					<Grid item xs={6}>
						<IconButton
							className='ride-sort-cb'
							onClick={() => _onToggle('reversed')}
							color={'secondary'}
							size={'small'}>
							{options.reversed ? <ArrowDownward /> : <ArrowUpward />}
						</IconButton>
					</Grid>
				</Grid>
			</LocalizationProvider>
		</div>
	);
}
{/*<Stack justifyContent='space-between' direction='row'>*/
}
{/*	<LocalizationProvider dateAdapter={AdapterDateFns}>*/
}
{/*		<DatePicker*/
}
{/*			label='From'*/
}
{/*			value={startDate}*/
}
{/*			onChange={(x)=>_onChange(x)};*/
}
{/*			}}*/
}
{/*			renderInput={(params: any) => <TextField variant='standard'*/
}
{/*													 sx={{ maxWidth: 125 }}{...params} />}*/
}
{/*		/>*/
}
{/*		<DatePicker*/
}
{/*			label='To'*/
}
{/*			value={endDate}*/
}
{/*			onChange={(newDate) => {*/
}
{/*				setDateTo(newDate);*/
}
{/*			}}*/
}
{/*			renderInput={(params: any) => <TextField variant='standard'*/
}
{/*													 sx={{ maxWidth: 125 }}{...params} />}*/
}
{/*		/>*/
}
{/*	</LocalizationProvider>*/
}
{/*</Stack>*/
}