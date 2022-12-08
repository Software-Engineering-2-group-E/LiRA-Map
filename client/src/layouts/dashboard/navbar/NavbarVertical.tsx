import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Drawer, Stack } from '@mui/material';
// hooks
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { NAVBAR } from '../../../config';
// components
import Scrollbar from '../../../components/Scrollbar';
import { NavSectionVertical } from '../../../components/nav-section';
import navConfig from './NavConfig';
import CollapseButton from './CollapseButton';
import AccountPopover from '../header/AccountPopover';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
	flexShrink: 0,
	transition: theme.transitions.create('width', {
		duration: theme.transitions.duration.shorter,
	}),
}));

// ----------------------------------------------------------------------

type Props = {
	isOpenSidebar: boolean;
	onCloseSidebar: VoidFunction;
};

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }: Props) {
	const theme = useTheme();

	const { pathname } = useLocation();
	const { isCollapsed, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
		useCollapseDrawer();

	useEffect(() => {
		if (isOpenSidebar) {
			onCloseSidebar();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	const renderContent = (
		<Scrollbar className={'scrollBarSideBar'}
				   sx={{
					   height: 1,
					   '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
				   }}>
			<Stack
				spacing={3}
				sx={{
					pt: 3,
					pb: 2,
					px: 2.5,
					flexShrink: 0,
					...(isCollapsed && { alignItems: 'center' }),
				}}
			>
				<Stack direction='row' alignItems='center' justifyContent='space-between'>
					<AccountPopover />

					{!isCollapsed && (
						<CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
					)}
				</Stack>

			</Stack>
			<NavSectionVertical className={'navSectionSideBar'} navConfig={navConfig} isCollapse={isCollapsed} />
		</Scrollbar>
	);

	return (
		<RootStyle
			sx={{
				width: isCollapsed ? NAVBAR.DASHBOARD_COLLAPSE_WIDTH : NAVBAR.DASHBOARD_WIDTH,
				...(collapseClick && {
					position: 'absolute',
				}),
			}}>
			{(
				<Drawer
					open={isOpenSidebar}
					onClose={onCloseSidebar}
					PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
				>
					{renderContent}
				</Drawer>
			)}

			{(
				<Drawer
					open
					variant='persistent'
					onMouseEnter={onHoverEnter}
					onMouseLeave={onHoverLeave}
					PaperProps={{
						sx: {
							width: NAVBAR.DASHBOARD_WIDTH,
							borderRightStyle: 'dashed',
							bgcolor: 'background.default',
							transition: (theme) =>
								theme.transitions.create('width', {
									duration: theme.transitions.duration.standard,
								}),
							...(isCollapsed && {
								width: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
							}),
							...(collapseHover && {
								...cssStyles(theme).bgBlur(),
								boxShadow: (theme) => theme.customShadows.z24,
							}),
						},
					}}>
					{renderContent}
				</Drawer>
			)}
		</RootStyle>
	);
}
