//@Author(s) s204442, s204433, s184230

// TODO: Laura: Not used - delete

// @mui
import { styled } from '@mui/material/styles';
import { AppBar, Box, Stack, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
//
import AccountPopover from './AccountPopover';

import Connection from '../../../components/Connection/Connection';

// ----------------------------------------------------------------------

type RootStyleProps = {
	isCollapse: boolean;
	isOffset: boolean;
	verticalLayout: boolean;
};

const RootStyle = styled(AppBar, {
	shouldForwardProp: (prop) =>
		prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootStyleProps>(({ isCollapse, isOffset, verticalLayout, theme }) => ({
	...cssStyles(theme).bgBlur(),
	boxShadow: 'none',
	height: HEADER.MOBILE_HEIGHT,
	zIndex: theme.zIndex.appBar + 1,
	transition: theme.transitions.create(['width', 'height'], {
		duration: theme.transitions.duration.shorter,
	}),
	// height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
	width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
	...(isCollapse && {
		width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
	}),
	...(isOffset && {
		height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
	}),
	...(verticalLayout && {
		width: '100%',
		height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
		backgroundColor: theme.palette.background.default,
	}),

}));

// ----------------------------------------------------------------------

type Props = {
	onOpenSidebar: VoidFunction;
	isCollapse?: boolean;
	verticalLayout?: boolean;
};

export default function DashboardHeader({
											onOpenSidebar,
											isCollapse = false,
											verticalLayout = false,
										}: Props) {
	const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
    
	return (
		<RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
			<Toolbar
				sx={{
					minHeight: '100% !important',
					px: { lg: 5 },
				}}>
				

				<Box sx={{ flexGrow: 1 }} />
              
				<Connection></Connection>

				<Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }}>
					<AccountPopover />
				</Stack>
              
			</Toolbar>
		</RootStyle>
	);
}
