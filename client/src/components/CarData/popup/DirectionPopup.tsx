import { Dispatch, FC, SetStateAction } from "react";
import { VscArrowLeft, VscArrowRight, VscArrowSwap } from 'react-icons/vsc'

import Checkbox from "../../Checkbox";


export interface IDirectionPopup {
    curDir: number;
    setDir: Dispatch<SetStateAction<number>>;
}

const DirCheckbox = ( { Icon, dir, curDir, setDir }: any ) => {
    return <Checkbox 
        html={<Icon />}  
        className='dir-checkbox'
        forceState={curDir === dir} 
        onClick={setDir(dir)}
    />
}

const DirectionPopup: FC<IDirectionPopup> = ( { curDir, setDir } ) => {

    const updateDir = (dir: number) => () => setDir(dir)

    return (
        <div className="seg-popup-container dir-popup-container">
            <DirCheckbox Icon={VscArrowLeft}  dir={0} curDir={curDir} setDir={updateDir} />
            <DirCheckbox Icon={VscArrowRight} dir={1} curDir={curDir} setDir={updateDir} />
            <DirCheckbox Icon={VscArrowSwap}  dir={2} curDir={curDir} setDir={updateDir} />
        </div>
    );
}

export default DirectionPopup;