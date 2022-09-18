
import { LatLngBounds, Map } from 'leaflet'
import { useState } from 'react';
import { useMapEvents } from "react-leaflet";

const useMapBounds = (): LatLngBounds => {

    const map = useMapEvents( { 
        moveend: () => setBounds( map.getBounds() )
    } )

    const [bounds, setBounds] = useState<LatLngBounds>(map.getBounds())

    return bounds;
}

export default useMapBounds