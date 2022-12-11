import {useState} from 'react';
// @mui
//import {alpha} from '@mui/material/styles';
import {Avatar, Box, Divider, MenuItem, Typography} from '@mui/material';
// components
import MenuPopover from '../../../components/MenuPopover';
import {IconButtonAnimate} from '../../../components/animate';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch, RootState} from "../../../store";
import {Link} from "react-router-dom";
import useCollapseDrawer from "../../../hooks/useCollapseDrawer";
import Connection from "../../../components/Connection/Connection";

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//     {
//         label: 'Home',
//         linkTo: '/',
//     },
//     {
//         label: 'Profile',
//         linkTo: '/',
//     },
//     {
//         label: 'Settings',
//         linkTo: '/',
//     },
// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
    const [open, setOpen] = useState<HTMLElement | null>(null);
    const dispatch = useDispatch<Dispatch>();

    const { userData, userCredentials } = useSelector(
        (state: RootState) => state.access
    )

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const { isCollapsed } = useCollapseDrawer();

    return (
        <>
            <IconButtonAnimate
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                        },
                    }),
                }}
            >
                <Avatar alt="User"/>
                <Box sx={{ position: 'absolute', top: '20px', left: '25px' }}>
                    <Connection/>
                </Box>
            </IconButtonAnimate>

            { !isCollapsed && (
                <Box sx={{ marginLeft: '10px'}}>
                    <Typography fontSize={21} fontWeight={'bold'} >{userData?.firstName} {userData?.lastName}</Typography>
                    <Typography fontSize={14} sx={{ opacity: 0.5 }}>{userCredentials?.user?.email}</Typography>
                </Box>)
            }

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                sx={{
                    p: 0,
                    mt: 1.5,
                    ml: 0.75,
                    '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                }}
            >
                <Box sx={{my: 1.5, px: 2.5}}>
                    <Typography variant="subtitle2" noWrap>
                        {userData?.firstName} {userData?.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {userCredentials?.user?.email}
                    </Typography>
                </Box>

                {/*<Divider sx={{ borderStyle: 'dashed' }} />*/}

                {/*<Stack sx={{ p: 1 }}>*/}
                {/*  {MENU_OPTIONS.map((option) => (*/}
                {/*    <MenuItem key={option.label} onClick={() => handleNavigate(option.linkTo)}>*/}
                {/*      {option.label}*/}
                {/*    </MenuItem>*/}
                {/*  ))}*/}
                {/*</Stack>*/}

                <Divider sx={{borderStyle: 'dashed'}}/>

                <MenuItem
                    component={Link}
                    to="/user/settings"
                    sx={{m: 1}}
                >Settings</MenuItem>
                <MenuItem sx={{m: 1}} onClick={() => dispatch.access.logout()}>Logout</MenuItem>
            </MenuPopover>
        </>
    );
}
