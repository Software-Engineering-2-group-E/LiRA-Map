//@Author(s) s184230

import { m, MotionProps } from 'framer-motion';
import { ReactNode } from 'react';
// @mui
import { Box, BoxProps } from '@mui/material';
// hooks
//
import { varContainer } from '.';

// ----------------------------------------------------------------------

type IProps = BoxProps & MotionProps;

interface Props extends IProps {
	children: ReactNode;
	disableAnimatedMobile?: boolean;
}

export default function MotionViewport({
										   children,
										   disableAnimatedMobile = true,
										   ...other
									   }: Props) {

	return (
		<Box
			component={m.div}
			initial='initial'
			whileInView='animate'
			viewport={{ once: true, amount: 0.3 }}
			variants={varContainer()}
			{...other}
		>
			{children}
		</Box>
	);
}
