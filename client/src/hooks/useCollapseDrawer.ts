import { useContext } from 'react';
import {CollapseDrawerContext} from "../context/CollapseDrawerContext";

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
