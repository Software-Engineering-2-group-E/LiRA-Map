//@Author(s) s184230

import { ReactNode, useMemo } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import {
	createTheme,
	StyledEngineProvider,
	ThemeOptions,
	ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles';
// hooks
import useSettings from '../hooks/useSettings';
//
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

type Props = {
	children: ReactNode;
};

export default function ThemeProvider({ children }: Props) {
	const { themeMode, themeDirection } = useSettings();

	const isLight = themeMode === 'light';

	const themeOptions: ThemeOptions = useMemo(
		() => ({
			palette: isLight ? palette.light : palette.dark,
			typography,
			shape: { borderRadius: 8 },
			direction: themeDirection,
			shadows: isLight ? shadows.light : shadows.dark,
			customShadows: isLight ? customShadows.light : customShadows.dark,
		}),
		[isLight, themeDirection],
	);

	const theme = createTheme(themeOptions);

	theme.components = componentsOverride(theme);

	return (
		<StyledEngineProvider injectFirst>
			<MUIThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MUIThemeProvider>
		</StyledEngineProvider>
	);
}
