import { FC, useEffect, useState } from "react";

import { RideMeta } from '../../models/models'



type Props = {
    md: RideMeta,
};

type Elt = {
    key: string,
    title: string,
    value: string,
    isSublist?: boolean
}


const DATE_MD = [
    "StartTimeUtc",
    "EndTimeUtc"
]

const POSITION_MD = [
    "StartPositionDisplay",
    "EndPositionDisplay"
]

const BANNED_MD = [
    "Fully_Imported",
    "Fully_RouteAnnotated",
    "Description",
    "ChangeLog"
]

const formatDate = (val: string) => {
    const date = new Date(val)
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
        + '  ' + date.getHours() + ':' + date.getMinutes()
}


//print all necessary meta info with a map function here
const MetaData: FC<Props> = ( { md } ) => {

    const [elts, setElts] = useState<Elt[]>([])

    const getMDelt = ( { key, title, value, isSublist }: Elt) => {                
        return <div className={`ride-metadata-elt ${isSublist ? 'sublist-elt' : ''}`} key={`metadata-${key}`}>
            <b>{title}:</b> {value} 
        </div>
    }

    useEffect(() => {
        const newElts: Elt[] = Object.entries(md)
            .filter( (elt) => !BANNED_MD.includes(elt[0]) )
            .flatMap( (elt: any, i: number) => {
                const [title, value] = elt;
                const key = md.TaskId + '-' + i;

                if ( POSITION_MD.includes(title) )
                {
                    const baseElt: Elt = { key: key, title: title, value: '' };
                    
                    let positions: [string, any][] = [];
                    try { positions = Object.entries(JSON.parse(value)) }
                    catch(e) { }                    

                    const mappedPos: Elt[] = positions
                        .map( (pos: [string, any], j) => { 
                            return { key: key + '-' + j, title: pos[0], value: pos[1], isSublist: true }
                        } )
                    return [ baseElt, ...mappedPos];
                }
                else if ( DATE_MD.includes(title))
                    return { key: key, title: title, value: formatDate(value) }

                return { key: key, title: title, value: value }
            } )
        
        setElts(newElts);
    }, [md])

    return (
        <>
        <div className="ride-metadata-separation"></div>
        <div className="ride-metadata-list" >
            { elts.map( (elt) => getMDelt(elt)) }
        </div>
        </>
    )
    
}

export default MetaData;