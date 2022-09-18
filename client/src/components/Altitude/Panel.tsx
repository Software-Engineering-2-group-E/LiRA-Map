
import { FC } from "react"
import Checkbox from "../Checkbox"


interface IPanel {
    showHotline: boolean;
    showHeatmap: boolean;
    toggleShowHotline: (isChecked: boolean) => void;
    toggleShowHeatmap: (isChecked: boolean) => void;
}


const Panel: FC<IPanel> = ( { showHotline, showHeatmap, toggleShowHotline, toggleShowHeatmap } ) => {
    return (
        <div className="panel-wrapper">
            <div className="panel-checkboxes">
                <Checkbox className="panel-checkbox" html={<p>Hotline</p>} forceState={showHotline} onClick={toggleShowHotline}/>
                <Checkbox className="panel-checkbox" html={<p>Heatmap</p>} forceState={showHeatmap} onClick={toggleShowHeatmap}/>
            </div>
        </div>
    )
}

export default Panel