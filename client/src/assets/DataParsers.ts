//@Author(s) s164420

import {RendererName} from "../models/renderers";
import { JSONProps, PointData } from "../models/path";
import { PathProperties } from "../models/properties";

export const parseSegments = (data: any): JSONProps[] => {
    // EXAMPLE OF ROW
    // Count: 18
    // Id: 57615
    // Length: 0.018770253
    // Value: 152.27777
    // Way: 502443899
    // lata: 55.7366596
    // latb: 55.7364914
    // lona: 12.486594
    // lonb: 12.4866143

    return data.rows.map( (row:any) => {
        // console.log(row);
        const pointA: PointData = { lat: row.lata, lng: row.lona }
        const pointB: PointData = { lat: row.latb, lng: row.lonb }
        const properties: PathProperties = { rendererName: RendererName.line, color:"#00000", width: 4 }
        /*
        max: row.Max, min: row.Min, length: row.Length, avg: row.Average,
        */
        return { 
            path: [pointA, pointB], 
            bounds: { minX: 0, maxX: 10, minY: 0, maxY: 10 },
            properties, 
            metadata: { id: row.Id,  count: row.Count, way: row.Way }
        };
    } )
}


