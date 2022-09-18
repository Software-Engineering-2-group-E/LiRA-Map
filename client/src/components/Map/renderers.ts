
import { Renderer, RendererName } from "../../models/renderers";

import Circles from "./Renderers/Circles";
import Heatmap from "./Renderers/Heatmap";
import Hotcircles from "./Renderers/Hotpoints";
import LatLngHotline from "./Renderers/LatLngHotline";
import Line from "./Renderers/Line";
import Rectangles from "./Renderers/Rectangles";


export default function renderers<T>( key: RendererName ): Renderer<T>
{
    switch ( key )
    {
        case 'circles':
            return Circles<T>;
        case 'rectangles':
            return Rectangles<T>;
        case 'line':
            return Line<T>;
        case 'hotline':
            return LatLngHotline<T>;
        case 'hotcircles':
            return Hotcircles<T>;
        case 'heatmap':
            return Heatmap<T>;
    }
    return LatLngHotline<T>;
}