import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {Box} from '@mui/material';
// hooks
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
// config
import { NAVBAR } from '../../config';
import NavbarVertical from './navbar/NavbarVertical';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { isValidToken } from '../../utils/jwt';
import LoadingIcon from "../../components/LoadingIcon";

// ----------------------------------------------------------------------

type MainStyleProps = {
	collapseClick: boolean;
};

const MainStyle = styled('main', {
	shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ collapseClick, theme }) => ({
	flexGrow: 1,

	// transition: theme.transitions.create(['margin-left'], {
	// 	duration: theme.transitions.duration.shorter
	// }),

	...(collapseClick && {
		marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
	}),
}));


// ----------------------------------------------------------------------

export default function DashboardLayout() {
	const { loading } = useSelector(
		(rootState: RootState) => rootState.loading.global
	);
	const { userCredentials } = useSelector((state: RootState) => state.access);
	const { collapseClick, isCollapsed } = useCollapseDrawer();
	const [open, setOpen] = useState(true);

	if (!isValidToken(userCredentials?.user?.stsTokenManager?.accessToken)) {
		return <Navigate to='/login' />;
	}

	/*
	const { themeLayout } = useSettings();
	const verticalLayout = themeLayout === 'vertical';
	 if (verticalLayout) {
		 console.log("VERTICAL")
	 return (
	   <>
		   {/!*<DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout={verticalLayout}/>*!/}
 
				 {/!*{isDesktop ? (*!/}
				 {/!*    <NavbarHorizontal/>*!/}
				 {/!*) : (*!/}
				 {/!*    <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>*!/}
				 {/!*)}*!/}
 
				 <Box
					 component="main"
					 sx={{
						 px: {lg: 2},
						 pt: {
							 xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
							 lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
						 },
						 pb: {
							 xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
							 lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
						 },
					 }}
				 >
					 <Outlet/>
				 </Box>
			 </>
		 );
	 }
	 console.log("HORIZONTAL")*/

	return (
		<Box
			sx={{
				display: 'flex',
				// display: { lg: 'flex' },
				// minHeight: { lg: 1 },
			}}
		>
			{loading && <LoadingIcon/>}
			<NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>

			<MainStyle collapseClick={collapseClick}>
				<Outlet/>
			</MainStyle>
		</Box>
	);
}
