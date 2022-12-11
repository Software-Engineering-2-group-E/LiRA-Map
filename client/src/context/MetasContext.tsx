import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { RideMeta } from '../models/models';
import { getRides } from '../queries/rides';


interface ContextProps {
	metas: RideMeta[];
	selectedMetas: RideMeta[];
	setSelectedMetas: Dispatch<SetStateAction<RideMeta[]>>;
	showMetas: SelectMeta[];
	setShowMetas: Dispatch<SetStateAction<SelectMeta[]>>;
}

interface SelectMeta extends RideMeta {
	selected: boolean;
}

const MetasContext = createContext({} as ContextProps);
export const MetasProvider = ({ children }: any) => {

	const [metas, setMetas] = useState<RideMeta[]>([]);
	const [selectedMetas, setSelectedMetas] = useState<RideMeta[]>([]);
	const [showMetas, setShowMetas] = useState<SelectMeta[]>([]);


	// fetch the metadata of all the rides
	useEffect(() => getRides(setMetas), []);

	return (
		<MetasContext.Provider
			value={{
				metas,
				selectedMetas,
				setSelectedMetas,
				showMetas,
				setShowMetas,
			}}
		>
			{children}
		</MetasContext.Provider>
	);
};

export const useMetasCtx = () => useContext(MetasContext);