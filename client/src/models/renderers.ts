import {FC} from "react";
import {Palette} from "react-leaflet-hotline";
import {LeafletEvent, LeafletEventHandlerFnMap} from 'leaflet';
import {Bounds, Path} from "./path";
import {PathProperties, RendererOptions} from "./properties";
import {HEATMAP_OPTIONS, RENDERER_PALETTE} from "../components/Map/constants";

export enum RendererName {
    circles = 'circles',
    rectangles = 'rectangles',
    line = 'line',
    hotline = 'hotline',
    hotcircles = 'hotcircles',
    heatmap = 'heatmap'
}

export interface RendererType {
    usePalette: boolean;
    defaultPalette?: Palette;
}

export const rendererTypes: { [key in RendererName]: RendererType } = {
    'circles': {usePalette: false},
    'rectangles': {usePalette: false},
    'line': {usePalette: false},
    'hotline': {usePalette: true, defaultPalette: RENDERER_PALETTE},
    'hotcircles': {usePalette: true, defaultPalette: RENDERER_PALETTE},
    'heatmap': {usePalette: true, defaultPalette: HEATMAP_OPTIONS.palette},
}

export type PathEventHandler = (i: number) => (e: LeafletEvent) => void;

export type EventHandlers = {
    [key in keyof LeafletEventHandlerFnMap]: PathEventHandler
};

export interface IRenderer<T> {
    data: T[];
    getLat: (t: T, i: number) => number;
    getLng: (t: T, i: number) => number;
    getVal: (t: T, i: number) => number;
    options: Required<RendererOptions>;
    eventHandlers?: EventHandlers;
}

export type Renderer<T> = FC<IRenderer<T>>;

export interface PathRenderer {
    path: Path;
    properties: PathProperties;
    bounds?: Bounds;
    onClick?: PathEventHandler;
}