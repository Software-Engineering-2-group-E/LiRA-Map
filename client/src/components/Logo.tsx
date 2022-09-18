import {Link as RouterLink} from 'react-router-dom';
// @mui
import {useTheme} from '@mui/material/styles';
import {Box, BoxProps} from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
    disabledLink?: boolean;
}

export default function Logo({disabledLink = false, sx}: Props) {
    const theme = useTheme();

    const PRIMARY_MAIN = theme.palette.primary.main;

    // OR
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
        <Box sx={{width: 40, height: 40, ...sx}}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1"
                 x="0px" y="0px" viewBox="0 0 64 64">
                <rect x="-223" y="-1765" className="st0" display="none" fill="#2B3544" width="608" height="1984"/>
                {/*<circle className="st1" fill="#E0E0D1" cx="32" cy="32" r="32"/>*/}
                <g>
                    <path className="st2" opacity="0.2" fill="#231F20"
                          d="M20,50c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V39c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V50z"/>
                    <path className="st2" opacity="0.2" fill="#231F20"
                          d="M50,50c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V39c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V50z"/>
                    <path className="st3" fill="#4F5D73"
                          d="M20,48c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V37c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V48z"/>
                    <path className="st3" fill="#4F5D73"
                          d="M50,48c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V37c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V48z"/>
                    <g className="st4" opacity="0.2">
                        <path className="st5" fill="#231F20"
                              d="M44,37H20c-3.3,0-6-2.7-6-6l0-0.4l2-10.1C17,17,19.2,15,22,15h20c2.8,0,5,2,5.9,5.5l0,0.1L50,31    C50,34.3,47.3,37,44,37z M18,31.2c0.1,1,0.9,1.8,2,1.8h24c1,0,1.9-0.8,2-1.8l-1.9-9.7C43.8,20.7,43.2,19,42,19H22    c-1.2,0-1.8,1.7-2.1,2.5L18,31.2z"/>
                    </g>
                    <path className="st6" fill="none" stroke={PRIMARY_MAIN} strokeWidth="4" strokeMiterlimit="10"
                          d="M48,29c0,2.2-1.8,4-4,4H20c-2.2,0-4-1.8-4-4l2-10c0.5-2,1.8-4,4-4h20c2.2,0,3.5,2,4,4L48,29z"/>
                    <g className="st4" opacity="0.2">
                        <path className="st5" fill="#231F20"
                              d="M52,42c0,2.2-1.8,4-4,4H16c-2.2,0-4-1.8-4-4v-5c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4V42z"/>
                        <path className="st5" fill="#231F20"
                              d="M48,48H16c-3.3,0-6-2.7-6-6v-5c0-3.3,2.7-6,6-6h32c3.3,0,6,2.7,6,6v5C54,45.3,51.3,48,48,48z M16,35    c-1.1,0-2,0.9-2,2v5c0,1.1,0.9,2,2,2h32c1.1,0,2-0.9,2-2v-5c0-1.1-0.9-2-2-2H16z"/>
                    </g>
                    <path className="st7" fill={PRIMARY_MAIN} stroke={PRIMARY_MAIN} strokeWidth="4" strokeMiterlimit="10"
                          d="M52,40c0,2.2-1.8,4-4,4H16c-2.2,0-4-1.8-4-4v-5c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4V40z"/>
                    <path className="st8" fill="#F5CF87" stroke={PRIMARY_MAIN} strokeWidth="2" strokeMiterlimit="10"
                          d="M21,38c0,2.2-1.8,4-4,4l0,0c-2.2,0-4-1.8-4-4l0,0c0-2.2,1.8-4,4-4l0,0C19.2,34,21,35.8,21,38L21,38z"/>
                    <path className="st8" fill="#F5CF87" stroke={PRIMARY_MAIN} strokeWidth="2" strokeMiterlimit="10"
                          d="M51,38c0,2.2-1.8,4-4,4l0,0c-2.2,0-4-1.8-4-4l0,0c0-2.2,1.8-4,4-4l0,0C49.2,34,51,35.8,51,38L51,38z"/>
                </g>
            </svg>
        </Box>
    )

    if (disabledLink) {
        return <>{logo}</>;
    }

    return <RouterLink to="/">{logo}</RouterLink>;
}
