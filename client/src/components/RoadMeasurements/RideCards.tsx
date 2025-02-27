//Author(s) s184234, s164420, s204442, s204433, s184230, s175182

import { FC, ReactNode, useEffect } from 'react';
import { List, ListRowRenderer } from 'react-virtualized';

import Checkbox from '../Checkbox';

import { RideMeta } from '../../models/models';

import { useMetasCtx } from '../../context/MetasContext';


interface CardsProps {
	showMetas: SelectMeta[];
	onClick: (meta: SelectMeta, i: number, isChecked: boolean) => void;
	height: number;
}

const Cards: FC<CardsProps> = ({ showMetas, onClick, height }) => {
	const renderRow: ListRowRenderer = ({ index, key, style }): ReactNode => {
		const meta = showMetas[index];
		return <div key={key} style={style}>
			<Checkbox
				forceState={meta.selected}
				// value={meta.selected} name={"hej"}
				className='ride-card-container'
				html={<div><b>{meta.TaskId}</b><br></br>{new Date(meta.Created_Date).toLocaleDateString()}</div>}
				onClick={(isChecked) => {
					onClick(meta, index, isChecked);
				}} />
		</div>;
	};

	// @ts-ignore
	return <List
		width={170}
		height={height - 230}
		rowHeight={75}
		rowRenderer={renderRow}
		rowCount={showMetas.length} />;
};

interface SelectMeta extends RideMeta {
	selected: boolean;
}

const RideCards: FC<{ height: number }> = ({ height }) => {
	const { metas, setSelectedMetas, showMetas, setShowMetas } = useMetasCtx();

	useEffect(() => {
		setShowMetas(metas.map(m => ({ ...m, selected: false })));
	}, [metas, setShowMetas]);

	const onClick = (md: SelectMeta, i: number, isChecked: boolean) => {
		const temp = [...showMetas];
		temp[i].selected = isChecked;
		setShowMetas(temp);

		return isChecked
			? setSelectedMetas(prev => [...prev, md])
			: setSelectedMetas(prev => prev.filter(({ TripId }) => md.TripId !== TripId));
	};

	return (
		<div className='ride-list' style={{ position: 'absolute', height: '100vh', zIndex: 500 }}>
			<Cards showMetas={showMetas} onClick={onClick} height={height} />
		</div>
	);
};

export default RideCards;
