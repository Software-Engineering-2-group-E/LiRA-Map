import { FC } from 'react'
import { FiMinus, FiPlus, FiRotateCcw } from 'react-icons/fi'

const zoomGap = 0.5

interface IZoom {
    setZoom: React.Dispatch<React.SetStateAction<number>>
}

const Zoom: FC<IZoom> = ( { setZoom } ) => {

    const zoomIn = () => setZoom( z => z + zoomGap )
    const zoomOut = () => setZoom( z => Math.max(1, z - zoomGap) )
    const resetZoom = () => setZoom( 1 )

    return (
        <div className="zoom-btns">
            <div className="btn zoom-btn" onClick={zoomIn}><FiPlus /></div>
            <div className="btn zoom-btn" onClick={zoomOut}><FiMinus /></div>
            <div className="btn zoom-btn" onClick={resetZoom}><FiRotateCcw /></div>
        </div>
    )
}

export default Zoom;