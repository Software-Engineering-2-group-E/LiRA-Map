//@Author(s) s184234, s204433

import { createContext, ReactNode, useState } from 'react';
// hooks

// ----------------------------------------------------------------------

export type CollapseDrawerContextProps = {
	isCollapsed: boolean;
	collapseClick: boolean;
	collapseHover: boolean;
	onToggleCollapse: VoidFunction;
	onHoverEnter: VoidFunction;
	onHoverLeave: VoidFunction;
};

const initialState: CollapseDrawerContextProps = {
	isCollapsed: false,
	collapseClick: true,
	collapseHover: false,
	onToggleCollapse: () => {
	},
	onHoverEnter: () => {
	},
	onHoverLeave: () => {
	},
};

const CollapseDrawerContext = createContext(initialState);

type CollapseDrawerProviderProps = {
	children: ReactNode;
};

function CollapseDrawerProvider({ children }: CollapseDrawerProviderProps) {
	const [collapse, setCollapse] = useState({
		click: true,
		hover: false,
	});

	const handleToggleCollapse = () => {
		setCollapse({ ...collapse, click: !collapse.click });
	};

	const handleHoverEnter = () => {
		if (collapse.click) {
			setCollapse({ ...collapse, hover: true });
		}
	};

	const handleHoverLeave = () => {
		setCollapse({ ...collapse, hover: false });
	};

	return (
		<CollapseDrawerContext.Provider
			value={{
				isCollapsed: collapse.click && !collapse.hover,
				collapseClick: collapse.click,
				collapseHover: collapse.hover,
				onToggleCollapse: handleToggleCollapse,
				onHoverEnter: handleHoverEnter,
				onHoverLeave: handleHoverLeave,
			}}
		>
			{children}
		</CollapseDrawerContext.Provider>
	);
}

export { CollapseDrawerProvider, CollapseDrawerContext };
