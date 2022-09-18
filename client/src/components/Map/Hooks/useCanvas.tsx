
import L from 'leaflet'
import { useEffect } from 'react';
import { useMap } from "react-leaflet";



const useCanvas = (): [L.Map, L.Canvas] => {
    const map = useMap()
    const canvas = L.canvas({});

    useEffect( () => {
        canvas.addTo(map)
        return () => { canvas.removeFrom(map) }
    }, [canvas, map])

    return [map, canvas];
}

export default useCanvas