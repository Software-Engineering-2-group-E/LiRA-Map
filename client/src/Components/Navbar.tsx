import { FC } from "react";
import { NavLink } from 'react-router-dom';


import '../css/navbar.css';

interface NavBtnProps {
    to: string;
    name: string;
}

const NavBtn: FC<NavBtnProps> = ( { to, name } ) => {
    return (
        <NavLink 
            className='nav-tab' 
            activeClassName="nav-tab-active" 
            to={to}
        >
            { name }
        </NavLink>
    )
}

const Navbar: FC = () => {
    return (
        <div className="nav-wrapper">
            <div className="nav-container">
                <div className="nav-block">
                    <NavBtn  to='/road_measurements' name='Road Measurements' />
                    <NavBtn  to='/road_conditions' name='Road Conditions' />
                    <NavBtn  to='/cardata' name='Cardata' />
                    <NavBtn  to='/altitude' name='Altitude' />
                </div>
            </div>
        </div>
    )
}

export default Navbar;
