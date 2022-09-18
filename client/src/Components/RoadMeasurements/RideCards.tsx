import {FC, ReactNode, useEffect, useState} from "react";
import {List, ListRowRenderer} from "react-virtualized";

import Checkbox from '../Checkbox';

import {RideMeta, TripsOptions} from '../../models/models'

import {useMetasCtx} from "../../context/MetasContext";
import OptionsSelector from "./OptionsSelector";


interface CardsProps {
    showMetas: SelectMeta[]
    onClick: (meta: SelectMeta, i: number, isChecked: boolean) => void;
}

const Cards: FC<CardsProps> = ({showMetas, onClick}) => {
    const renderRow: ListRowRenderer = ({index, key, style}): ReactNode => {
        const meta = showMetas[index];
        return <div key={key} style={style}>
            <Checkbox
                forceState={meta.selected}
                className="ride-card-container"
                html={<div><b>{meta.TaskId}</b><br></br>{new Date(meta.Created_Date).toLocaleDateString()}</div>}
                onClick={(isChecked) => {
                    onClick(meta, index, isChecked)
                }}/>
        </div>
    }

    return null
    // <List
    //     width={170}
    //     height={2500}
    //     rowHeight={61}
    //     rowRenderer={renderRow}
    //     rowCount={showMetas.length}/>
}

interface SelectMeta extends RideMeta {
    selected: boolean;
}

const RideCards: FC = () => {

    const {metas, selectedMetas, setSelectedMetas} = useMetasCtx();

    const [showMetas, setShowMetas] = useState<SelectMeta[]>([])

    useEffect(() => {
        setShowMetas(metas.map(m => ({...m, selected: false})))
    }, [metas])

    const onChange = ({search, startDate, endDate, reversed}: TripsOptions) => {
        const temp: SelectMeta[] = metas
            .filter((meta: RideMeta) => {
                const inSearch = search === "" || meta.TaskId.toString().includes(search)
                const date = new Date(meta.Created_Date).getTime()
                const inDate = date >= startDate.getTime() && date <= endDate.getTime()
                return inSearch && inDate
            })
            .map((meta: RideMeta) => {
                const selected = selectedMetas.find(({TripId}) => meta.TripId === TripId) !== undefined
                return {...meta, selected}
            })
        setShowMetas(reversed ? temp.reverse() : temp)
    }

    const onClick = (md: SelectMeta, i: number, isChecked: boolean) => {
        const temp = [...showMetas]
        temp[i].selected = isChecked
        setShowMetas(temp)

        return isChecked
            ? setSelectedMetas(prev => [...prev, md])
            : setSelectedMetas(prev => prev.filter(({TripId}) => md.TripId !== TripId))
    }


    return (
        <div className="ride-list">
            <OptionsSelector onChange={onChange}/>
            <Cards showMetas={showMetas} onClick={onClick}/>
        </div>
    )
}

export default RideCards;
