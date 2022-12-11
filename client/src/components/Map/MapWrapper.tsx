import useSettings from "../../hooks/useSettings";
import { MapContainer, ScaleControl, TileLayer } from "react-leaflet";

import Zoom from "./Zoom";

import { MAP_OPTIONS } from "./constants";

import 'leaflet/dist/leaflet.css';

const MapWrapper = (props: any) => {
  const { children } = props;
  const { themeMode } = useSettings();

  const { center, zoom, minZoom, maxZoom, scaleWidth } = MAP_OPTIONS;

  return (
    <MapContainer
      style={{
        height: "100vh",
        WebkitFilter:
          themeMode === "dark"
            ? "invert(100%) hue-rotate(190deg) brightness(1)"
            : undefined,
        filter:
          themeMode === "dark"
            ? "invert(100%) hue-rotate(190deg) brightness(1)"
            : undefined,
      }}
      preferCanvas={true}
      center={center}
      zoom={zoom}
      minZoom={minZoom}
      maxZoom={maxZoom}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      <TileLayer
        maxNativeZoom={maxZoom}
        maxZoom={maxZoom}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Zoom />
      <ScaleControl
        imperial={false}
        position="bottomright"
        maxWidth={scaleWidth}
      />
      {children}
    </MapContainer>
  );
};

export default MapWrapper;
