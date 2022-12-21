//@Author s183816

// Represents a point containing (lat, lng) coordinates,
import { LatLng } from "./models";
import { MeasProperties, PathProperties } from "./properties";
import { PathEventHandler } from "./renderers";

// rendering properties, and optionally, a value and some metadata (like timestamp)
export interface PointData extends LatLng {
	value?: number;   	   			
	metadata?: any;
}

// A Path is a collection of points
export type Path = PointData[]

export type Metadata =  { [key: string]: any }

export interface Bounds {
    minX?: number;
    maxX?: number;
	minY?: number;
    maxY?: number; 
}

// measurement name -> trip task id -> value type -> bounded path (used in Rides)
export type MeasMetaPath = { [key: string]: {[key: number]: { [key: string]: BoundedPath } } }

// Props passed to the Path and EventPath components
export interface PathProps {
	path: Path;
	bounds?: Bounds;
	properties: PathProperties;
	metadata?: Metadata;
	onClick?: PathEventHandler
}

// used for queries
export interface BoundedPath {
	type: string;
	path: Path;
	bounds?: Bounds;
}

// This interface is used as a type for server's response
// for instance, JSON files follow this format
export interface JSONProps extends BoundedPath {
	properties: MeasProperties;
	metadata?: Metadata;
}


export interface Node {
    lat: number;
	lng: number;
	way_dist: number;
}

export type Ways = { [key: string]: Node[] }

export interface ValueLatLng extends LatLng {
	value: number;
}

export interface Condition {
	way_dist: number;
	value: number;
}

export type WayId = string;

export interface WaysConditions { 
	way_lengths: number[];
	way_ids: WayId[];
	geometry: Node[][];
	conditions: Condition[][];
}

