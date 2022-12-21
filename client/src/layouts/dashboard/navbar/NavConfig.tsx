//@Author(s) s204442, s175182

// components
import {CarCrash, Landscape, RemoveRoad, SquareFoot, Dashboard, Star} from "@mui/icons-material";

// ----------------------------------------------------------------------

const navConfig = [
    {
        subheader: 'My Lira',
        items: [
            {title: 'User dashboard', path: '/dashboard', icon: <Dashboard/>},
            {title: 'Managed roads', path: '/managed', icon: <Star/>}
        ],
    },
    {
        subheader: 'Roads',
        items: [
            {title: 'Road Measurement', path: '/road/measurement', icon: <SquareFoot/>},
            {title: 'Road Condition', path: '/road/condition', icon: <RemoveRoad/>},
            {title: 'Altitude', path: '/road/altitude', icon: <Landscape/>}
        ],
    },
    /*{
        subheader: 'Cars',
        items: [
            {title: 'Car Data', path: '/car/data', icon: <CarCrash/>}
        ],
    },*/
];

export default navConfig;
