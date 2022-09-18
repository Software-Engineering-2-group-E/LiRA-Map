import { useEffect, useState } from "react"
import { MinMax } from "../assets/graph/types";

type History = {[key: string]: [number, number]}

const resetMinMax = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER] as MinMax


const useMinMax = ( defaultInterval: MinMax ) => {
    const [bounds, setBounds] = useState<MinMax>(defaultInterval);
    const [history, setHistory]  = useState<History>({})

    const addInterval = ( id: string, [nmin, nmax]: MinMax ) => {
        setHistory( prev => ({ ...prev, [id]: [nmin, nmax] }) )
    }

    const remInterval = (id: string) => {
        setHistory( prev => {
            const temp = { ...prev };
            delete temp[id];
            return temp;
        } )
    }

    useEffect( () => {
        if ( Object.keys(history).length === 0 ) 
            return setBounds( defaultInterval )

        const newMinMax = Object.values(history).reduce( ([accMin, accMax], [curMin, curMax]) => 
            [Math.min(accMin, curMin), Math.max(accMax, curMax)] as MinMax
        , resetMinMax )

        setBounds(newMinMax)
    }, [defaultInterval, history] )

    return { bounds, addInterval, remInterval }
}

export default useMinMax;