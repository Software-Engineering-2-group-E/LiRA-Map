//@Author(s) s184234, s164420, s204442, s184230

// @mui
// hooks
// components
import Page from "../components/Page";

import * as React from "react";
import { useEffect, useState } from "react";

import Panel from "../components/Altitude/Panel";
import MapWrapper from "../components/Map/MapWrapper";
import Heatmap from "../components/Map/Renderers/Heatmap";
import DistHotline from "../components/Map/Renderers/DistHotline";

import { Node } from "../models/path";

import { HEATMAP_OPTIONS, RENDERER_OPTIONS } from "../components/Map/constants";
import { useDispatch, useSelector } from "react-redux";

import "leaflet/dist/leaflet.css";
import "../css/altitude.css";
import { Dispatch, RootState } from "../store";

// ----------------------------------------------------------------------

export default function RoadAltitude() {
  const dispatch = useDispatch<Dispatch>();

  const { altitudes } = useSelector(
    (rootState: RootState) => rootState.altitude
  );

  const { loading } = useSelector(
    (rootState: RootState) => rootState.loading.models.altitude
  );

  const [showHotline, setShowHotline] = useState<boolean>(false);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

  useEffect(() => {
    dispatch.altitude.getAltitudes();
  }, []);

  const options = [
    { name: "Hotline", isSelected: showHotline, toggle: toggleShowHotline },
    { name: "Heatmap", isSelected: showHeatmap, toggle: toggleShowHeatmap },
  ];

  function toggleShowHeatmap() {
    setShowHeatmap(!showHeatmap);
  }

  function toggleShowHotline() {
    setShowHotline(!showHotline);
  }

  return (
    <Page title="Road Altitude">
      <div className="altitude-wrapper">
        <MapWrapper>
          {!loading && <Panel options={options} />}
          {showHotline && altitudes ? (
            <DistHotline
              way_ids={altitudes.way_ids}
              geometry={altitudes.geometry}
              conditions={altitudes.conditions}
              options={{ min: 0, max: 140 }}
            />
          ) : null}
          {showHeatmap && altitudes ? (
            <Heatmap
              data={altitudes.geometry.flat()}
              getLat={(t: Node) => t.lat}
              getLng={(t: Node) => t.lng}
              getVal={(t: Node) => 2}
              options={{
                ...RENDERER_OPTIONS, // temporary fix
                max: 10,
                width: 20,
                palette: HEATMAP_OPTIONS.palette,
              }}
            />
          ) : null}
        </MapWrapper>
      </div>
    </Page>
  );
}
