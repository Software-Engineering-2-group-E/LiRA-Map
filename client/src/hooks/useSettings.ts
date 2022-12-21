//@Author(s) s184230

import { useContext } from 'react';
import {SettingsContext} from "../context/SettingsContext";

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext);

export default useSettings;
